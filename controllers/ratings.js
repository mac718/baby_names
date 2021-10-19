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

const groupRatings = (ratings) => {
  let groupDivs = [];

  for (let score = 1; score <= 10; score += 1) {
    let groupRatings = ratings.filter(
      (rating) => Number(rating.score) === score
    );
    let group = groupRatings.map((rating) => rating.name);
    groupDivs.push(group);
  }

  return groupDivs;
};

const getRatings = async (req, res) => {
  let user = await User.find({ name: req.cookies.user });

  let ratings = await Rating.find({ user: user._id });
  let groupDivs = groupRatings(ratings);
  res.json({ groupDivs });
};

const updateRating = async (req, res) => {
  let { name, rating } = req.body;
  console.log(rating);
  let email = req.cookies.user;
  let user = await User.find({ name: email });
  let score = await Rating.find({ name, user: user._id });
  console.log(score);
  score[0].score = rating;
  await score[0].save();
  res.json();
};

module.exports = { saveRating, getRatings, updateRating };
