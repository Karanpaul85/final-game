import mongoose from "mongoose";

const footerContentSchema = new mongoose.Schema(
  {
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwriting issue
export const FooterContent =
  mongoose.models.Footer || mongoose.model("Footer", footerContentSchema);
