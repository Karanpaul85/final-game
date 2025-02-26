import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  areas: [
    {
      area: { type: String, required: true },
      areaId: { type: String, required: true },
    },
  ],
});

// Prevent model overwriting issue
export const Area = mongoose.models.Area || mongoose.model("Area", areaSchema);
