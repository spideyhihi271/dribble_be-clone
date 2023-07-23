const mongoose = require("mongoose");

const jobScheme = new mongoose.Schema(
  {
    idOwner: { type: String, require: true },
    name: { type: String, require: true },
    nameCom: { type: String, require: true },
    avtCom: { type: String },
    siteCom: { type: String },
    location: { type: String, require: true },
    city: { type: String},
    creativeField: { type: String},
    applys: { type: Array },
    jobType: { type: Boolean },
    onSiteRequired: { type: Boolean },
    contents: { type: Array },
    deleted: { type: Boolean },
    reports: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobScheme);
