const { default: mongoose } = require("mongoose");

const HomeSchema = mongoose.Schema(
  {
    pageTitle: { type: String, default: "Default title" },
    pageDescription: { type: String, default: "Default description" },
    pageKeywords: { type: String, default: "Default keywords" },
    topContent: { type: String },
    footerContent: { type: String },
  },
  {
    timestamps: true,
  }
);

export const HomeDataContent =
  mongoose.models.homeData || mongoose.model("homeData", HomeSchema);
