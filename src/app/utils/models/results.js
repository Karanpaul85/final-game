import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  date: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
  results: [
    {
      area: { type: String, required: true },
      areaId: { type: String, required: true },
      luckyWinner: { type: String, default: "" }, // Ensure these fields are explicitly defined
      totalEntries: { type: String, default: "" },
      drawTime: { type: String, default: "" },
    },
  ],
});

export const Result =
  mongoose.models.results || mongoose.model("results", resultSchema);
