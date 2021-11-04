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
  const user = await User.findOne({ _id: userInfo.id });
  const { firstName, lastName, email, password } = user;

  res.status(200).json({ firstName, lastName, email, password });
});

const updatePassword = async (userInfo, body, next) => {
  const user = await User.findOne({ _id: userInfo.id });
  const match = await bcrypt.compare(body.currentPassword, user.password);
  if (!match) {
    return next(createCustomError("Current password is not correct", 401));
  } else if (body.newPassword !== body.confirmPassword) {
    return next(
      createCustomError("Confirm password does not match new password", 401)
    );
  }
  const newPassword = await bcrypt.hash(body.newPassword, 10);
  await user.update({ password: newPassword });
};

const updateUser = asyncWrapper(async (req, res, next) => {
  const userInfo = req.user;
  const body = req.body;

  if (body.property === "password") {
    await updatePassword(userInfo, body, next);
  } else {
    console.log("prop", body.firstName);
    const user = await User.findOneAndUpdate(
      { _id: userInfo.id },
      { [body.property]: body[body.property] },
      { new: true, useFindAndModify: false }
    );
    console.log(user);
  }
  res.sendStatus(200);
});

module.exports = { createUser, login, getUser, updateUser };
