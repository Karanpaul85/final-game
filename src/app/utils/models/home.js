const { default: mongoose } = require("mongoose");

const HomeSchema = mongoose.Schema(
  {
    topContent: { type: String },
    footerContent: { type: String },
  },
  {
    timestamps: true,
  }
);

export const HomeDataContent =
  mongoose.models.homeData || mongoose.model("homeData", HomeSchema);
