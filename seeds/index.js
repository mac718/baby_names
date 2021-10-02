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
    let names = [];

    for (let idx = 0; idx < 500; idx += 1) {
      let length = Math.floor(Math.random() * (15 - 2) + 3);
      let genderIndex = Math.floor(Math.random() * 2);
      let name = "";

      for (let alphaIdx = 0; alphaIdx < length; alphaIdx += 1) {
        let randomIndex = Math.floor(Math.random() * 26);
        idx === 0
          ? (name += alphabet[randomIndex].toLocaleUpperCase())
          : (name += alphabet[randomIndex]);
      }

      names.push({ name, gender: genders[genderIndex] });
    }

    return models.Name.create(names);
  },
});
