import mongoose from "mongoose";

const StudySessionSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("StudySession", StudySessionSchema);
