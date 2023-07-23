const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    idOwner: { type: String, require: true },
    name: { type: String, require: true },
    shorts: { type: Array },
    description: { type: String },
    deleted: { type: Boolean},
    views: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
