const User = require("../models/user");
const asyncWrapper = require("../middleware/async");
const jwt = require("jsonwebtoken");

const createUser = asyncWrapper(async (req, res) => {
  const { name, password } = req.body;
  let user = new User({ name, password });
  let registeredUser = await user.save().catch((err) => console.log(err));
  console.log(registeredUser);

  let payload = { id: registeredUser._id, email: registeredUser.name };
  let token = jwt.sign(payload, process.env.JWT_SECRET);

  res.status(200).json({ token });

  //res.status(200).json();
  // let email = req.body.email;

  // User.find({ name: email }, (err, user) => {
  //   console.log("thing", user);
  //   if (err) {
  //     console.log(err);
  //   }
  //   if (user.length === 0) {
  //     let user = new User({ name: email });
  //     user.save((err, user) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log("user", user);
  //     });
  //   }
  // });

  // res.cookie("user", email, { httpOnly: true });
  // res.send();
});

module.exports = { createUser };
