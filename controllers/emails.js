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

  // const sgMail = require("@sendgrid/mail");
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // const msg = {
  //   to: "mac718@gmail.com", // Change to your recipient
  //   from: "Baby Names <mike@mikesnaturalsoaps.com>", // Change to your verified sender
  //   subject: "Sending with SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // };
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log("Email sent");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  res.status(200).send();
});

module.exports = sendLinkEmail;
