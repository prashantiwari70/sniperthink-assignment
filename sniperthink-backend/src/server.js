import express from "express";
import cors from "cors";
import interestRoutes from "./routes/interestRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", interestRoutes);
app.use("/api", fileRoutes);
app.use("/api", jobRoutes);

app.get("/", (req, res) => {
  res.send("SniperThink Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});