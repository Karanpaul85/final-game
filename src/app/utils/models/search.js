const { default: mongoose } = require("mongoose");

const SearchSchema = mongoose.Schema(
  {
    topContent: { type: String },
    footerContent: { type: String },
  },
  {
    timestamps: true,
  }
);

export const SearchDataContent =
  mongoose.models.searchData || mongoose.model("searchData", SearchSchema);
