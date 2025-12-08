import express from "express";
import Module from "../models/Module.js";

const router = express.Router();

/* =============================
   GET ALL MODULES
============================= */
router.get("/", async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
});

/* =============================
   GET SINGLE MODULE
============================= */
router.get("/:id", async (req, res) => {
  const module = await Module.findById(req.params.id);
  res.json(module);
});

/* =============================
   CREATE NEW MODULE
============================= */
router.post("/", async (req, res) => {
  try {
    const newModule = new Module(req.body);
    await newModule.save();
    res.json(newModule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =============================
   UPDATE MODULE
============================= */
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

/* =============================
   DELETE MODULE
============================= */
router.delete("/:id", async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    res.json({ message: "Module deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ========================================
    TASK ROUTES
======================================== */

/* --- ADD TASK --- */
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

/* --- GET TASKS FOR A MODULE --- */
router.get("/:id/tasks", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    res.json(module.tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* --- UPDATE / TOGGLE TASK COMPLETION --- */
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

/* --- DELETE TASK --- */
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

/* ========================================
     NOTES ROUTE
======================================== */

/* --- UPDATE NOTES FOR A MODULE --- */
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
