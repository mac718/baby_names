const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/user");

app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")().then(() => next());
  }
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/createUser", (req, res, next) => {
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

app.listen(3001);
