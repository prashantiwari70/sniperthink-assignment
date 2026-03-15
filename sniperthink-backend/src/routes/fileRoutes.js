import express from "express";
import multer from "multer";
import db from "../config/db.js";
import fileQueue from "../queue/fileQueue.js";



const router = express.Router();

const upload = multer({
  dest: "uploads/"
});

router.post("/upload", upload.single("file"), async (req, res) => {

 

const upload = multer({

  dest: "uploads/",

  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },

  fileFilter: (req, file, cb) => {

    const allowedTypes = ["application/pdf", "text/plain"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and TXT files are allowed"));
    }

  }

});

  const filePath = req.file.path;

  // Save file in database
  const [fileResult] = await db.execute(
    "INSERT INTO files (file_path) VALUES (?)",
    [filePath]
  );

  const fileId = fileResult.insertId;

  // Create job entry
  const [jobResult] = await db.execute(
    "INSERT INTO jobs (file_id, status, progress) VALUES (?, 'pending', 0)",
    [fileId]
  );

  const jobId = jobResult.insertId;

  // Push job to queue
  await fileQueue.add(
  "process-file",
  {
    jobId,
    filePath
  },
  {
    attempts: 5
  }
);

  res.json({
    message: "File uploaded and job created",
    jobId
  });

});

export default router;