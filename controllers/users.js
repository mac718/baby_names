const User = require("../models/user");
const asyncWrapper = require("../middleware/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  CustomAPIError,
  createCustomError,
} = require("../errors/customAPIError");

const createUser = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  let user = new User({ firstName, lastName, email, password });
  let registeredUser = await user.save();

  let payload = { id: registeredUser._id, email: registeredUser.name };
  let token = jwt.sign(payload, process.env.JWT_SECRET);

  res.cookie("token", token, { httpOnly: true }).sendStatus(200);
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createCustomError(`No user with email ${email}.`, 401));
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return next(
      createCustomError(`Email and/or password is/are incorrect.`, 401)
    );
  }
  const payload = { id: user._id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true }).sendStatus(200);
});

const getUser = asyncWrapper(async (req, res) => {
  const userInfo = req.user;
  console.log(userInfo);
  const user = await User.findOne({ _id: userInfo.id });
  const { firstName, lastName, email, password } = user;

  res.status(200).json({ firstName, lastName, email, password });
});

module.exports = { createUser, login, getUser };
