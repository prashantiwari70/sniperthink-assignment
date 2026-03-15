import fs from "fs";
import { Worker } from "bullmq";
import connection from "../queue/redis.js";
import db from "../config/db.js";
import { removeStopwords } from "stopword";

console.log("Worker started...");

const worker = new Worker(
  "file-processing",
  async (job) => {

    const { jobId, filePath } = job.data;

    console.log("Processing file:", filePath);

    // update job status
    await db.execute(
      "UPDATE jobs SET status='processing', progress=30 WHERE id=?",
      [jobId]
    );

    const content = fs.readFileSync(filePath, "utf-8");

    // word count
    const words = content.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // paragraph count
    const paragraphs = content.split(/\n+/).filter(Boolean);
    const paragraphCount = paragraphs.length;

    // clean text
    const cleanWords = content
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);

    const filteredWords = removeStopwords(cleanWords);

    const freq = {};

    filteredWords.forEach((word) => {
      freq[word] = (freq[word] || 0) + 1;
    });

    const topKeywords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((item) => item[0]);

    await db.execute(
      `INSERT INTO results (job_id, word_count, paragraph_count, keywords)
       VALUES (?, ?, ?, ?)`,
      [jobId, wordCount, paragraphCount, JSON.stringify(topKeywords)]
    );

    await db.execute(
      "UPDATE jobs SET status='completed', progress=100 WHERE id=?",
      [jobId]
    );

    console.log("Job completed:", jobId);
  },
  {
    connection
  }
);