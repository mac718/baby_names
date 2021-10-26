const Name = require("../models/name");
const User = require("../models/user");
const Rating = require("../models/rating");
const asyncWrapper = require("../middleware/async");

const saveRating = asyncWrapper(async (req, res) => {
  let email = req.cookies.user;

  let { name, score } = req.body;

  let user = await User.findOne({ name: email });
  if (!user) {
    return createCustomError("No user with that email found.", 404);
  }

  await Rating.create({
    name,
    score,
    user: user._id,
  });

  let userRatings = await Rating.find({ user: user._id });
  let ratedNames = userRatings.map((rating) => rating.name);
  let names = await Name.find({});
  let unratedNames = names.filter((name) => !ratedNames.includes(name.name));
  res.json({ unratedNames });
});

const groupRatings = (ratings) => {
  let groupDivs = [];

  for (let score = 10; score >= 1; score -= 1) {
    let groupRatings = ratings.filter(
      (rating) => Number(rating.score) === score
    );
    let group = groupRatings.map((rating) => rating.name);
    groupDivs.push(group);
  }

  return groupDivs;
};

const getRatings = asyncWrapper(async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });
  console.log(user);
  if (!user) {
    return createCustomError("No user with that email found.", 404);
  }

  let ratings = await Rating.find({ user: req.user.id });
  console.log(ratings);
  let groupDivs = groupRatings(ratings);
  res.status(200).json({ groupDivs });
});

const updateRating = asyncWrapper(async (req, res) => {
  let { name, rating } = req.body;
  console.log("rating", rating);
  let email = req.cookies.user;
  let user = await User.findOne({ name: email });
  if (!user) {
    return createCustomError("No user with that email found.", 404);
  }
  let score = await Rating.find({ name, user: user._id });
  if (!score) {
    return createCustomError(
      `No rating for user ${email}} and name ${name}`,
      404
    );
  }
  score[0].score = rating;
  await score[0].save();
  res.status(200).json();
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
