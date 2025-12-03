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
  const newModule = new Module(req.body);
  await newModule.save();
  res.json(newModule);
});

router.put("/:id", async (req, res) => {
  const updated = await Module.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Module.findByIdAndDelete(req.params.id);
  res.json({ message: "Module deleted" });
});

export default router;
