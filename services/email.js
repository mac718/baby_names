const nodemailer = require("nodemailer");
require("dotenv").config();

// const _transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// const EmailService = {};

// EmailService.send = (options) => {
//   return new Promise((resolve, reject) => {
//     _transporter.sendMail(options, (err, info) => {
//       err ? reject(err) : resolve(info);
//     });
//   });
// };
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: "mac718@gmail.com", // Change to your recipient
//   from: "mike@mikesnaturalsoaps.com", // Change to your verified sender
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

//module.exports = EmailService;
