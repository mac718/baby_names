const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/customAPIError");
const EmailService = require("../services/email");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const sendLinkEmail = asyncWrapper(async (req, res) => {
  const { email, code, sender } = req.body;
  const recipient = User.findOne({ email });

  let message = `Hi, ${
    recipient.firstName
  }! You've been invited to link your baby ranker account with ${sender}.
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
    html: `<p>Hi! ${recipient.firstName},
    
    You've been invited to link your baby ranker account with ${sender}.
    Log in to your account and enter this code: 
    
    <div style="text-alignment: center; font-weight: bold; font-size: 24px; border: 1px solid; background: lightGray; margin-bottom: 20px;">${code}</div>
    
    on your 'linked accounts' 
    page to confirm your link with ${
      sender.split(" ")[0]
    }. Otherwise, just ignore
    this email :)
    
    Happy ranking!
    </p>`,
  };

  EmailService.send(options);

  res.status(StatusCodes.OK).send();
});

module.exports = sendLinkEmail;
