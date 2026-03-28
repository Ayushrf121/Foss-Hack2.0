import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userdatas",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const HistoryModel =
  mongoose.model.history || mongoose.model("histories", historySchema);

export default HistoryModel;