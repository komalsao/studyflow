import express from "express";
import {
    generateStudyResources,
    generateStudyTitle,
} from "../controllers/generateStudyController.js";

const router = express.Router();

router.post("/generate", generateStudyResources);
router.post("/title", generateStudyTitle);

export default router;
