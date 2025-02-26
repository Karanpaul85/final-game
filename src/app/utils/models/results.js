// const { default: mongoose } = require("mongoose");

// const areaSchema = new mongoose.Schema({
//   area: { type: String, required: true },
//   areaId: { type: String, required: true },
//   time: { type: String, required: false, default: "" }, // Allow empty values
//   winner: { type: String, required: false, default: "" }, // Allow empty values
//   entries: { type: String, required: false, default: "" }, // Allow empty values
// });

// const resultSchema = new mongoose.Schema({
//   date: { type: String, required: true },
//   month: { type: Number, required: true }, // Store month as a number
//   year: { type: Number, required: true }, // Store year as a number
//   results: [areaSchema], // Embedding areaSchema directly
// });

// export const Result =
//   mongoose.models.results || mongoose.model("results", resultSchema);

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
