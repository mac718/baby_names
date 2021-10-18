const Name = require("../models/name");
const User = require("../models/user");

const getNames = (req, res) => {
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
};

module.exports = { getNames };
