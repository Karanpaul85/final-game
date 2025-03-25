const { default: mongoose } = require("mongoose");

const SearchSchema = mongoose.Schema(
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

export const SearchDataContent =
  mongoose.models.searchData || mongoose.model("searchData", SearchSchema);
