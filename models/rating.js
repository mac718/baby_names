const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema (
  {
    info: {type: Array}
  },
  {timestamps: true}
)

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;