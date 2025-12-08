import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
});

const ModuleSchema = new mongoose.Schema({
  title: String,
  lecturer: String,
  semester: String,
  category: String,
  difficulty: Number,
  progress: Number,
  status: String,
  image: String,
  notes: { type: String, default: "" },


  tasks: [TaskSchema],
});

export default mongoose.model("Module", ModuleSchema);
