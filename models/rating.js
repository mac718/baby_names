const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    name: String,
    score: Number,
    User: mongoose.ObjectId,
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
