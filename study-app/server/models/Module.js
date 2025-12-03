import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
  title: String,
  lecturer: String,
  semester: String,
  category: String,
  difficulty: String,
  progress: String,
  status: String,
});

export default mongoose.model("Module", ModuleSchema);
