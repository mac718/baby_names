const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NameSchema = new Schema(
  {
    name: { type: String },
    gender: { type: String },
    origin: { type: String },
  },
  { timestamps: true }
);

const Name = mongoose.model("Name", NameSchema);

module.exports = Name;
