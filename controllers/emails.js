const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/customAPIError");
const EmailService = require("../services/email");
const User = require("../models/user");

const sendLinkEmail = asyncWrapper(async (req, res) => {
  const { email } = req.body;
  const userInfo = req.user;
  //const user = await User.findOne({ _id: userInfo.id });

  let message = "Here is the code you requested for Baby Name Ranker.";
  const options = {
    from: userInfo.email,
    to: email,
    subject: "Baby Names",
    text: message,
    html: `<p>${message}</p>`,
  };

  await EmailService.send(options);

  res.status(200).send();
});

module.exports = sendLinkEmail;
