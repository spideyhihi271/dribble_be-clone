const mongoose = require("mongoose");

const creativeFieldSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CreativeField", creativeFieldSchema);
