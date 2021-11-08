const { User, LinkCode } = require("../models");
const asyncWrapper = require("../middleware/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
// const {
//   CustomAPIError,
//   createCustomError,
// } = require("../errors/customAPIError");

const { BadRequestError } = require("../errors");

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
    //return next(createCustomError(`No user with email ${email}.`, 401));
    throw new BadRequestError(`No user with email ${email}.`);
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    // return next(
    //   createCustomError(`Email and/or password is/are incorrect.`, 401)
    // );
    throw new BadRequestError(`Email and/or password is/are incorrect.`);
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
    throw new BadRequestError("Current password is not correct");
    //return next(createCustomError("Current password is not correct", 401));
  } else if (body.newPassword !== body.confirmPassword) {
    throw new BadRequestError("Confirm password does not match new password");
    // return next(

    //   createCustomError("Confirm password does not match new password", 401)
    // );
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
    const user = await User.findOneAndUpdate(
      { _id: userInfo.id },
      { [body.property]: body[body.property] },
      { new: true, useFindAndModify: false }
    );
  }
  res.sendStatus(200);
});

const getLinkedUsers = asyncWrapper(async (req, res, next) => {
  const userInfo = req.user;

  const user = await User.findOne({ _id: userInfo.id });
  const linkedUsersIds = user.linkedUsers;
  let linkedUsers = await User.find({ _id: { $in: linkedUsersIds } });

  console.log(linkedUsers);

  res.json({ linkedUsers });
});

const addPendingLinkedUserSent = asyncWrapper(async (req, res, next) => {
  const userInfo = req.user;
  const { email } = req.body;
  const linkCode = randomString.generate(6);

  const recipient = await User.findOne({ email });
  const sender = await User.findOne({ _id: userInfo.id });
  // await sender.update({
  //   pendingLinkedUserSent: [
  //     ...sender.pendingLinkedUserSent,
  //     [recipient._id, linkCode],
  //   ],
  // });
  // await recipient.update({
  //   pendingLinkedUserReceived: [
  //     ...recipient.pendingLinkedUserReceived,
  //     [sender._id, linkCode],
  //   ],
  // });
  // console.log("sender recip", sender, recipient);
  let code = new LinkCode({ sender, recipient, code: linkCode });
  await code.save();
  res.sendStatus(200);
});

const addLinkedUser = asyncWrapper(async (req, res, next) => {
  const { code } = req.body;
  const userInfo = req.user;

  const recipient = await User.findOne({ _id: userInfo.id });
  const pendingLink = await LinkCode.findOne({ code });
  const sender = await User.findOne({ _id: pendingLink.sender });

  await recipient.updateOne({
    linkedUsers: [...recipient.linkedUsers, sender._id],
  });
  await sender.updateOne({
    linkedUsers: [...sender.linkedUsers, recipient._id],
  });
  res.sendStatus(200);
});

module.exports = {
  createUser,
  login,
  getUser,
  updateUser,
  getLinkedUsers,
  addPendingLinkedUserSent,
  addLinkedUser,
};
