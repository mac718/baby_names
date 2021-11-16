const Name = require("../models/name");
const User = require("../models/user");
const Rating = require("../models/rating");
const asyncWrapper = require("../middleware/async");
const jwt = require("jsonwebtoken");
const { UnauthorizedError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const saveRating = asyncWrapper(async (req, res) => {
  let { name, score } = req.body;
  let userInfo = req.user;

  let user = await User.findOne({ _id: userInfo.id });

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

  res.status(StatusCodes.CREATED).json({ unratedNames });
});

// const groupRatings = (ratings) => {
//   let groupDivs = [];

//   for (let score = 10; score >= 1; score -= 1) {
//     let groupRatings = ratings.filter(
//       (rating) => Number(rating.score) === score
//     );
//     let group = groupRatings.map((rating) => rating.name);
//     groupDivs.push(group);
//   }

//   return groupDivs;
// };

const getRatings = asyncWrapper(async (req, res) => {
  let userInfo;
  if (req.params.id === "id") {
    userInfo = req.user;
  } else {
    userInfo = req.params;
  }

  let user = await User.findOne({ _id: userInfo.id });
  if (!user) {
    throw new UnauthorizedError("Not authorized. Please log in.");
    //return createCustomError("No user with that email found.", 404);
  }

  let ratings = await Rating.find({ user: user._id });
  //let groupDivs = groupRatings(ratings);
  res.status(StatusCodes.OK).json({ ratings, username: user.firstName });
});

const updateRating = asyncWrapper(async (req, res) => {
  let { name, rating } = req.body;
  let userInfo = req.user;
  let user = await User.findOne({ _id: userInfo.id });
  if (!user) {
    throw new UnauthorizedError("Not authorized. Please log in.");

    //return createCustomError("No user with that email found.", 404);
  }
  let score = await Rating.findOne({ name, user: user._id });
  if (!score) {
    throw new NotFoundError(`No rating for user ${email}} and name ${name}`);
    // return createCustomError(
    //   `No rating for user ${email}} and name ${name}`,
    //   404
    // );
  }
  score.score = rating;
  await score.save();
  res.status(StatusCodes.OK).json();
});

const deleteRating = asyncWrapper(async (req, res) => {
  let { name } = req.body;
  let userInfo = req.user;
  let user = await User.findOne({ _id: userInfo.id });
  await Rating.findOneAndDelete({ name, user: user._id }).catch((err) =>
    console.log(err)
  );
  res.status(StatusCodes.OK).json();
});

module.exports = {
  saveRating,
  getRatings,
  updateRating,
  deleteRating,
};
