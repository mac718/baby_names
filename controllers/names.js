const asyncWrapper = require("../middleware/async");
const Name = require("../models/name");
const User = require("../models/user");
const Rating = require("../models/rating");
const { UnauthorizedError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getNames = asyncWrapper(async (req, res) => {
  let userInfo = req.user;

  let user = await User.findOne({ _id: userInfo.id });

  if (!user) {
    throw new UnauthorizedError("Not authorized. Please Log in.");
  }
  let names = await Name.find({});
  let userRatings = await Rating.find({ user: user._id });
  let ratedNames = userRatings.map((rating) => rating.name);
  let unratedNames = names.filter((name) => !ratedNames.includes(name.name));

  res
    .status(StatusCodes.OK)
    .json({ names: unratedNames, username: user.firstName });
});

const getSingleName = asyncWrapper(async (req, res) => {
  const nameRated = req.params.name;

  const name = await Name.findOne({ name: nameRated });

  if (!name) {
    throw new NotFoundError("Name not found.");
  }
  res.status(StatusCodes.OK).json({ name });
});

module.exports = { getNames, getSingleName };
