const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkCodeSchema = new Schema(
  {
    sender: mongoose.ObjectId,
    recipient: mongoose.ObjectId,
    code: String,
    status: String,
  },
  { timestamps: true }
);

const LinkCode = mongoose.model("LinkCode", LinkCodeSchema);

module.exports = LinkCode;
