import express from "express";
import Module from "../models/Module.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
});


router.get("/:id", async (req, res) => {
  const module = await Module.findById(req.params.id);
  res.json(module);
});


router.post("/", async (req, res) => {
  try {
    const newModule = new Module(req.body);
    await newModule.save();
    res.json(newModule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updated = await Module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    res.json({ message: "Module deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/:id/tasks", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    module.tasks.push({ text: req.body.text });
    await module.save();
    res.json(module.tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id/tasks", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    res.json(module.tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/tasks/:taskId", async (req, res) => {
  try {
    const module = await Module.findOne({ "tasks._id": req.params.taskId });

    const task = module.tasks.id(req.params.taskId);
    task.completed = req.body.completed;

    await module.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const module = await Module.findOne({ "tasks._id": req.params.taskId });

    module.tasks = module.tasks.filter(
      (t) => t._id.toString() !== req.params.taskId
    );

    await module.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id/notes", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    module.notes = req.body.notes;
    await module.save();
    res.json({ message: "Notes updated", notes: module.notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
