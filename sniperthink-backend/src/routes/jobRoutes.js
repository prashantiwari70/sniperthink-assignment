import express from "express";
import db from "../config/db.js";

const router = express.Router();


// GET JOB STATUS
router.get("/job/:id", async (req, res) => {

  const jobId = req.params.id;

  const [rows] = await db.execute(
    "SELECT id, status, progress FROM jobs WHERE id = ?",
    [jobId]
  );

  if (rows.length === 0) {
    return res.status(404).json({
      error: "Job not found"
    });
  }

  res.json(rows[0]);
});


// GET PROCESSING RESULT
router.get("/result/:jobId", async (req, res) => {

  const jobId = req.params.jobId;

  const [rows] = await db.execute(
    "SELECT job_id, word_count, paragraph_count, keywords FROM results WHERE job_id = ?",
    [jobId]
  );

  if (rows.length === 0) {
    return res.status(404).json({
      error: "Result not found"
    });
  }

  res.json(rows[0]);
});

export default router;