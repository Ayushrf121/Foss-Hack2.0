import express from "express";
import { saveHistory, getHistory, deleteHistory } from "../controllers/historyController.js";

const router = express.Router();

router.post("/save", saveHistory);
router.get("/", getHistory);
router.delete("/:id", deleteHistory);

export default router;