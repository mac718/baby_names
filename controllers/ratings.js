const Name = require("../models/name");
const User = require("../models/user");
const Rating = require("../models/rating");
const asyncWrapper = require("../middleware/async");

const saveRating = asyncWrapper(async (req, res) => {
  let email = req.cookies.user;

  let { name, score } = req.body;

  let user = await User.findOne({ name: email });
  console.log("name", user);

  let rating = await Rating.create({
    name,
    score,
    user: user._id,
  }).catch((err) => console.log(err));

  let userRatings = await Rating.find({ user: user._id });
  let ratedNames = userRatings.map((rating) => rating.name);
  let names = await Name.find({});
  let unratedNames = names.filter((name) => !ratedNames.includes(name.name));
  res.json({ unratedNames });
});

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

const getRatings = asyncWrapper(async (req, res) => {
  let user = await User.findOne({ name: req.cookies.user });

  let ratings = await Rating.find({ user: user._id });
  let groupDivs = groupRatings(ratings);
  res.json({ groupDivs });
});

const updateRating = asyncWrapper(async (req, res) => {
  let { name, rating } = req.body;
  console.log(rating);
  let email = req.cookies.user;
  let user = await User.find({ name: email });
  let score = await Rating.find({ name, user: user._id });
  if (!score) {
    return res
      .status(404)
      .json({ msg: `No rating for user ${email}} and name ${name}` });
  }
  console.log(score);
  score[0].score = rating;
  await score[0].save();
  res.json();
});

const deleteRating = asyncWrapper(async (req, res) => {
  let { name } = req.body;
  let email = req.cookies.user;
  let user = await User.findOne({ name: email });
  await Rating.findOneAndDelete({ name, user: user._id }).catch((err) =>
    console.log(err)
  );
  res.status(201).json();
});

module.exports = { saveRating, getRatings, updateRating, deleteRating };
