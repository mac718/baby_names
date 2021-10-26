const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Name = require("../models/name");
const {
  saveRating,
  getRatings,
  updateRating,
} = require("../controllers/ratings");
const checkToken = require("../middleware/auth");

router.post("/saveRating", checkToken, saveRating);

router.put("/updateRating", checkToken, updateRating);
// (req, res) => {
//   let { name, rating } = req.body;
//   let email = req.cookies.user;
//   User.find({ name: email }, (err, user) => {
//     if (err) {
//       alert(err);
//     }

//     user[0].ratings.forEach((combo, idx) => {
//       console.log("combo", combo);
//       if (combo[0] === name) {
//         user[0].ratings[idx][1] = rating;
//         console.log(user[0].ratings[idx]);
//       }
//     });

//     user[0].markModified("ratings");

//     user[0].save((err, user) => {
//       if (err) {
//         alert(err);
//       }

//       console.log(user.ratings);
//       return res.json({ user });
//     });
//   });
// }

router.get("/getRatings", getRatings);
// (req, res) => {
//   let ratings;
//   let user = req.cookies.user;

//   User.find({ name: user }, (err, user) => {
//     if (err) {
//       alert(err);
//     }

//     ratings = user[0].ratings;

//     let groupDivs = [];

//     for (let rating = 1; rating <= 10; rating += 1) {
//       let groupRatings = ratings.filter((score) => Number(score[1]) === rating);
//       let group = groupRatings.map((score) => score[0]);
//       groupDivs.push(group);
//     }
//     return res.json({ groupDivs });
//   });

module.exports = router;
