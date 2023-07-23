const mongoose = require("mongoose");

const tagScheme = new mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tag", tagScheme);
