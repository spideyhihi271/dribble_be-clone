const mongoose = require("mongoose");

const shortScheme = new mongoose.Schema(
  {
    idOwner: { type: String, requied: true },
    name: { type: String, require: true },
    likes: { type: Array },
    views: { type: Number, require: true },
    tags: { type: Array },
    hex: { type: String },
    contents: { type: Array, require: true },
    report: { type: Number },
    deleted: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Short", shortScheme);
