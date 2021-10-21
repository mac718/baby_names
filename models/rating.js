const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    name: { type: String, required: [true, "Rating must include name"] },
    score: { type: Number, required: [true, "Rating must include score"] },
    user: {
      type: mongoose.ObjectId,
      required: [true, "Rating must be associated with a user"],
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
