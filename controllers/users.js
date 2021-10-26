const User = require("../models/user");
const asyncWrapper = require("../middleware/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  CustomAPIError,
  createCustomError,
} = require("../errors/customAPIError");

const createUser = asyncWrapper(async (req, res) => {
  const { name, password } = req.body;
  let user = new User({ name, password });
  let registeredUser = await user.save().catch((err) => console.log(err));
  console.log(registeredUser);

  let payload = { id: registeredUser._id, email: registeredUser.name };
  let token = jwt.sign(payload, process.env.JWT_SECRET);

  res.status(200).json({ token });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ name: email });
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

module.exports = { createUser, login };
