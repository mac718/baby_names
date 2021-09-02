const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const Name = require("./models/name");

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

  User.find({ name: user }, (err, user) => {
    if (err) {
      console.log(err);
    }

    console.log(user);

    if (!user.ratings) {
      user.ratings = [];
    }

    user[0].ratings.push([name, rating]);

    Name.find((err, names) => {
      let ratedNames = [];
      if (user.ratings) {
        ratedNames = user[0].ratings.map((rating) => {
          return rating[0];
        });
      }

      names = names.filter((name) => {
        return !ratedNames.includes(name.name);
      });
      user[0].save((err) => {
        if (err) {
          console.log(err);
        }
        return res.json({ names });
      });
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

app.get("/getNames", (req, res) => {
  let email = req.cookies.user;
  Name.find((err, names) => {
    if (err) {
      console.log(err);
    }

    User.find({ name: email }, (err, user) => {
      if (err) {
        alert(err);
      }

      let ratedNames = [];

      if (user.ratings) {
        ratedNames = user[0].ratings.map((rating) => {
          return rating[0];
        });
      }

      names = names.filter((name) => {
        return !ratedNames.includes(name.name);
      });
      let nameArr = names.map((name) => name.name);
      console.log(ratedNames, nameArr);
    });

    return res.json({ names });
  });
});

app.listen(3001);
