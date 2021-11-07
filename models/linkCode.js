const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkCodeSchema = new Schema(
  {
    user: mongoose.ObjectId,
    code: String,
  },
  { timestamps: true }
);

const LinkCode = mongoose.model("LinkCode", LinkCodeSchema);

module.exports = LinkCode;
