const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    folllows: { type: Array },
    likes: { type: Array },
    collections: { type: Array },
    urlAvt: { type: String },
    urlBanner: { type: String },
    introdution: { type: String },
    bio: { type: String },
    address: { type: String },
    creativeField: { type: Array },
    socialNetworks: { type: Array },
    availability: { type: Number },
    findwork: { type: Boolean },
    report: { type: Number },
    role: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userScheme);
