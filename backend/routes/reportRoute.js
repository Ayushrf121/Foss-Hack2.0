import express from "express";
import { analyzeReport } from "../controllers/reportController.js";
import multer from "multer";

const router = express.Router();

// multer config (temporary storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route
router.post("/analyze", upload.single("file"), analyzeReport);

export default router;