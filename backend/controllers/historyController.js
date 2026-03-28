import HistoryModel from "../models/history.js";
import jwt from "jsonwebtoken";

// Helper: extract userId from Authorization header
const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
};

// POST /history/save
const saveHistory = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { fileName, result } = req.body;
    if (!fileName || !result) {
      return res
        .status(400)
        .json({ success: false, message: "fileName and result are required" });
    }

    const entry = new HistoryModel({ userId, fileName, result });
    await entry.save();

    return res.status(201).json({ success: true, data: entry });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// GET /history
const getHistory = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const entries = await HistoryModel.find({ userId }).sort({ createdAt: -1 });
    return res.json({ success: true, data: entries });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE /history/:id
const deleteHistory = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { id } = req.params;
    const entry = await HistoryModel.findOne({ _id: id, userId });
    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Entry not found" });
    }

    await HistoryModel.deleteOne({ _id: id });
    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { saveHistory, getHistory, deleteHistory };