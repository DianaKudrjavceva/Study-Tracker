import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import modulesRouter from "./routes/modules.js";
import studySessionRoutes from "./routes/studySessions.js";

dotenv.config();
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use("/modules", modulesRouter);
app.use("/study-sessions", studySessionRoutes);


const clientDistPath = path.join(__dirname, "..", "dist");
app.use(express.static(clientDistPath));


app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
