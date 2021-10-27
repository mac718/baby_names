const asyncWrapper = require("../middleware/async");
const Name = require("../models/name");
const User = require("../models/user");
const Rating = require("../models/rating");
const createCustomError = require("../errors/customAPIError");
const jwt = require("jsonwebtoken");

const getNames = asyncWrapper(async (req, res) => {
  let userInfo = req.user;

  let user = await User.findOne({ _id: userInfo.id });

  if (!user) {
    return createCustomError("No user with that email found.", 404);
  }
  let names = await Name.find({});
  let userRatings = await Rating.find({ user: user._id });
  let ratedNames = userRatings.map((rating) => rating.name);
  let unratedNames = names.filter((name) => !ratedNames.includes(name.name));

  res.status(200).json({ names: unratedNames });
});

module.exports = { getNames };
