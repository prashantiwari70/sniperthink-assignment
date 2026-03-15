import express from "express";

const router = express.Router();

router.post("/interest", (req, res) => {
  const { name, email, step } = req.body;

  console.log("New Interest Submission:");
  console.log(name, email, step);

  res.json({
    message: "Interest received successfully"
  });
});

export default router;