const Name = require("../models/name");
const User = require("../models/user");
const Rating = require("../models/rating");
const asyncWrapper = require("../middleware/async");
const jwt = require("jsonwebtoken");
const { UnauthorizedError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const saveRating = asyncWrapper(async (req, res) => {
  let { name, score, unratedNames } = req.body;
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
  let ratedNameDocs = userRatings.map((rating) => rating.name);
  let ratedNames = ratedNameDocs.map((nameDoc) => nameDoc.name);
  //let names = await Name.find({});
  unratedNames = unratedNames.filter((name) => !ratedNames.includes(name.name));

  res.status(StatusCodes.CREATED).json({ unratedNames });
});

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
  }

  let ratings = await Rating.find({ user: user._id });
  res.status(StatusCodes.OK).json({ ratings, username: user.firstName });
});

const updateRating = asyncWrapper(async (req, res) => {
  let { name, rating } = req.body;
  let userInfo = req.user;
  let user = await User.findOne({ _id: userInfo.id });
  if (!user) {
    throw new UnauthorizedError("Not authorized. Please log in.");
  }
  let score = await Rating.findOne({ name, user: user._id });
  if (!score) {
    throw new NotFoundError(`No rating for user ${email}} and name ${name}`);
  }
  score.score = rating;
  await score.save();
  res.status(StatusCodes.OK).json();
});

const deleteRating = asyncWrapper(async (req, res) => {
  console.log("he");
  let { name } = req.body;
  let userInfo = req.user;

  await Rating.findOneAndDelete({ "name.name": name, user: userInfo.id }).catch(
    (err) => console.log(err)
  );
  console.log(rating);
  res.status(StatusCodes.OK).json();
});

module.exports = {
  saveRating,
  getRatings,
  updateRating,
  deleteRating,
};
