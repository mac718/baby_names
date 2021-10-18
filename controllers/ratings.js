const Name = require("../models/name");
const User = require("../models/user");
const Rating = require("../models/rating");

const saveRating = async (req, res) => {
  let email = req.cookies.user;
  let { name, score } = req.body;
  let user = await User.find({ name: email });
  await Rating.create({ name, score, user: user._id });
  let userRatings = await Rating.find({ user: user._id });
  let ratedNames = userRatings.map((rating) => rating.name);
  let names = await Name.find({});
  let unratedNames = names.filter((name) => !ratedNames.includes(name.name));
  res.json({ unratedNames });
};

module.exports = { saveRating };
