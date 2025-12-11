import express from "express";
import StudySession from "../models/StudySession.js";

const router = express.Router();


router.get("/:moduleId", async (req, res) => {
  const sessions = await StudySession.find({ moduleId: req.params.moduleId });
  res.json(sessions);
});

router.post("/", async (req, res) => {
  const newSession = new StudySession(req.body);
  await newSession.save();
  res.json(newSession);
});

router.get("/", async (req, res) => {
    const sessions = await StudySession.find();
    res.json(sessions);
});
  

export default router;
