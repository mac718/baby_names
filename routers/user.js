const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/createUser", (req, res, next) => {
  let email = req.body.email;

  User.find({ name: email }, (err, user) => {
    console.log("thing", user);
    if (err) {
      console.log(err);
    }
    if (user.length === 0) {
      let user = new User({ name: email });
      user.save((err, user) => {
        if (err) {
          console.log(err);
        }
        console.log("user", user);
      });
    }
  });

  res.cookie("user", email, { httpOnly: true });
  res.send();
});

module.exports = router;
