const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/customAPIError");
const EmailService = require("../services/email");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const sendLinkEmail = asyncWrapper(async (req, res) => {
  const { email, code, sender } = req.body;
  const userInfo = req.user;
  //const user = await User.findOne({ _id: userInfo.id });

  let message = `You've been invited to link your baby ranker account with ${sender}.
                  Log in to your account and enter this code: ${code} on your 'linked accounts' 
                  page to confirm your link with ${
                    sender.split(" ")[0]
                  }. Otherwise, just ignore
                  this email :)\n\nHappy ranking!`;
  const options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Baby Names",
    text: message,
    html: `<p>${message}</p>`,
  };

  await EmailService.send(options);

  res.status(StatusCodes.OK).send();
});

module.exports = sendLinkEmail;
