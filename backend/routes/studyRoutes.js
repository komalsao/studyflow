import express from "express";
import { createStudySession } from "../controllers/studyController.js";

const router = express.Router();

router.post("/create", createStudySession);

export default router;