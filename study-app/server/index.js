import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import modulesRouter from "./routes/modules.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/modules", modulesRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
