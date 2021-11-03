const mongoose = require("mongoose");
const mongooseeder = require("mongooseeder");
const models = require("../models");

const mongodbUrl = "mongodb://localhost/baby_names_development";

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const genders = ["m", "f", "u"];
    const origins = ["USA", "Europe", "Africa", "Asia"];
    let names = [];

    for (let idx = 0; idx < 500; idx += 1) {
      let length = Math.floor(Math.random() * (15 - 2) + 3);
      let genderIndex = Math.floor(Math.random() * 2);
      let originsIndex = Math.floor(Math.random() * 4);
      let name = "";

      for (let alphaIdx = 0; alphaIdx < length; alphaIdx += 1) {
        let randomIndex = Math.floor(Math.random() * 26);
        alphaIdx === 0
          ? (name += alphabet[randomIndex].toUpperCase())
          : (name += alphabet[randomIndex]);
      }

      names.push({
        name,
        gender: genders[genderIndex],
        origin: origins[originsIndex],
      });
    }

    return models.Name.create(names);
  },
});
