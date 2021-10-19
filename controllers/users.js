const User = require("../models/user");

const createUser = (req, res) => {
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
};

const saveRating = (req, res) => {
  let { name, rating } = req.body;
  let user = req.cookies.user;

  User.find({ name: user }, (err, user) => {
    if (err) {
      console.log(err);
      return res.json();
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
};

const updateRating = (req, res) => {
  let { name, rating } = req.body;
  let email = req.cookies.user;
  User.find({ name: email }, (err, user) => {
    if (err) {
      alert(err);
    }

    user[0].ratings.forEach((combo, idx) => {
      console.log("combo", combo);
      if (combo[0] === name) {
        user[0].ratings[idx][1] = rating;
        console.log(user[0].ratings[idx]);
      }
    });

    user[0].markModified("ratings");

    user[0].save((err, user) => {
      if (err) {
        alert(err);
      }

      console.log(user.ratings);
      return res.json({ user });
    });
  });
};

const getAllRatings = (req, res) => {
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
};

module.exports = { createUser, saveRating, updateRating, getAllRatings };