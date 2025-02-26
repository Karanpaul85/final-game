const { default: mongoose } = require("mongoose");

const userModel = mongoose.Schema(
  {
    email: String,
    password: String,
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.models.users || mongoose.model("users", userModel);
