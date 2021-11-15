const { User, LinkCode } = require("../models");
const asyncWrapper = require("../middleware/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
// const {
//   CustomAPIError,
//   createCustomError,
// } = require("../errors/customAPIError");

const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const FileUploader = require("../services/photoUpload");

const createUser = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  let user = new User({ firstName, lastName, email, password });
  let registeredUser = await user.save({ runValidators: true });

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
  res.cookie("token", token, { httpOnly: true }).sendStatus(StatusCodes.OK);
});

const getUser = asyncWrapper(async (req, res) => {
  const userInfo = req.user;
  const user = await User.findOne({ _id: userInfo.id });
  const { firstName, lastName, email, password, pic } = user;

  res
    .status(StatusCodes.OK)
    .json({ firstName, lastName, email, password, pic });
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
  res.sendStatus(StatusCodes.OK);
});

const getLinkedUsers = asyncWrapper(async (req, res, next) => {
  const userInfo = req.user;

  const user = await User.findOne({ _id: userInfo.id });
  if (!user) {
    throw new UnauthorizedError("Not authorized. Please log in.");
  }
  const linkedUsersIds = user.linkedUsers;
  let linkedUsers = await User.find({ _id: { $in: linkedUsersIds } });

  res.status(StatusCodes.OK).json({ linkedUsers });
});

const addPendingLinkedUserSent = asyncWrapper(async (req, res, next) => {
  const userInfo = req.user;
  console.log(userInfo);
  const { email } = req.body;
  const linkCode = randomString.generate(6);

  const recipient = await User.findOne({ email });
  if (!recipient) {
    throw new NotFoundError("No user with this email exists.");
  }
  const sender = await User.findOne({ _id: userInfo.id });
  if (!sender) {
    throw new UnauthorizedError("Not authorized. Please log in.");
  }
  let code = new LinkCode({ sender, recipient, code: linkCode });
  await code.save();

  res
    .status(StatusCodes.OK)
    .json({ linkCode, sender: `${sender.firstName} ${sender.lastName}` });
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
  res.sendStatus(StatusCodes.OK);
});

const deleteLinkedUser = asyncWrapper(async (req, res, next) => {
  console.log("hello");
  const userInfo = req.user;
  const userToUnlinkId = req.params.id;

  let currentUser = await User.findOne({ _id: userInfo.id });
  let userToUnlink = await User.findOne({ _id: userToUnlinkId });

  const currentUserlinkedUsersIdx =
    currentUser.linkedUsers.indexOf(userToUnlinkId);
  const userToUnlinkLinkedUsersIdx = userToUnlink.linkedUsers.indexOf(
    userInfo.id
  );

  currentUser.linkedUsers.splice(currentUserlinkedUsersIdx, 1);
  await currentUser.save();

  userToUnlink.linkedUsers.splice(userToUnlinkLinkedUsersIdx, 1);
  await userToUnlink.save();
  res.sendStatus(StatusCodes.OK);
});

const signOut = asyncWrapper(async (req, res) => {
  res.clearCookie("token");
  res.sendStatus(StatusCodes.OK);
});

const uploadProfilePic = asyncWrapper(async (req, res, next) => {
  const userInfo = req.user;
  const photo = await FileUploader.upload({
    data: req.file.buffer,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
  }).catch((err) => {
    console.log(err);
    next();
  });

  const user = await User.findOne({ _id: userInfo.id });
  await user.update({ pic: photo.url });
  res.sendStatus(StatusCodes.OK);
});

module.exports = {
  createUser,
  login,
  getUser,
  updateUser,
  getLinkedUsers,
  addPendingLinkedUserSent,
  addLinkedUser,
  deleteLinkedUser,
  signOut,
  uploadProfilePic,
};
