import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import modulesRouter from "./routes/modules.js";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/modules", modulesRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
