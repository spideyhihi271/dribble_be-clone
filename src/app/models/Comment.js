const mongoose = require("mongoose");

const commentScheme = new mongoose.Schema(
  {
    idOwner: { type: String, require: true },
    idShort: { type: String, require: true },
    content: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentScheme);
