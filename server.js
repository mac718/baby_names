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

app.post("/saveRating", (req, res) => {
  let { name, rating } = req.body;
  let user = req.cookies.user;
  console.log(req.cookies);

  User.find({ name: user }, (err, user) => {
    if (err) {
      console.log(err);
    }

    console.log(user);

    user[0].ratings.push([name, rating]);

    user[0].save((err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

app.get("/getRatings", (req, res) => {
  let ratings;
  let user = req.cookies.user;

  User.find({ name: user }, (err, user) => {
    if (err) {
      alert(err);
    }

    ratings = user[0].ratings;

    let groupDivs = [];

    for (let rating = 1; rating <= 10; rating += 1) {
      let groupRatings = ratings.filter((score) => Number(score[1]) === rating);
      let group = groupRatings.map((score) => score[0]);
      groupDivs.push(group);
    }
    return res.json({ groupDivs });
  });
});

app.listen(3001);
