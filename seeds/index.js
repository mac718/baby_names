const mongoose = require("mongoose");
const mongooseeder = require("mongooseeder");
const models = require("../models");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const mongodbUrl = process.env.MONGODB_URI; //"mongodb://localhost/baby_names_development";

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: async () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const genders = ["m", "f", "u"];
    const origins = ["USA", "Europe", "Africa", "Asia"];
    let names = [];

    //for (let idx = 0; idx < 500; idx += 1) {
    //let length = Math.floor(Math.random() * (15 - 2) + 3);
    //let genderIndex = Math.floor(Math.random() * 2);

    //let name = "";

    // for (let alphaIdx = 0; alphaIdx < length; alphaIdx += 1) {
    //   let randomIndex = Math.floor(Math.random() * 26);
    //   alphaIdx === 0
    //     ? (name += alphabet[randomIndex].toUpperCase())
    //     : (name += alphabet[randomIndex]);
    // }
    // let maleNames;
    // let maleNameStream = fs.readFileSync(
    //   path.resolve(__dirname, "./male_names.rft"),
    //   {
    //     encoding: "utf8",
    //     flag: "r",
    //   }
    // );

    let maleNames = fs.readFileSync(
      path.resolve(__dirname, "../data/male_names.rtf")
    );

    maleNames = maleNames.toString().split("\n");

    let femaleNames = fs.readFileSync(
      path.resolve(__dirname, "../data/female_names.rtf")
    );

    femaleNames = femaleNames.toString().split("\n");

    maleNames = maleNames.sort();
    femaleNames = femaleNames.sort();

    let fIndex = 0;
    let mIndex = 0;
    let neutral = [];

    while (fIndex < femaleNames.length || mIndex < maleNames.length) {
      if (femaleNames[fIndex] === maleNames[mIndex]) {
        let originsIndex = Math.floor(Math.random() * 4);
        names.push({
          name: femaleNames[fIndex].slice(0, femaleNames[fIndex].length - 1),
          gender: "n",
          origin: origins[originsIndex],
        });
        // fIndex += 1;
        // mIndex += 1;
        femaleNames.splice(fIndex, 1);
        maleNames.splice(mIndex, 1);
      } else if (femaleNames[fIndex] < maleNames[mIndex]) {
        fIndex += 1;
      } else {
        mIndex += 1;
      }
    }

    for (let i = 0; i < maleNames.length; i += 1) {
      let originsIndex = Math.floor(Math.random() * 4);
      names.push({
        name: maleNames[i].slice(0, maleNames[i].length - 1),
        gender: "m",
        origin: origins[originsIndex],
      });
    }

    for (let i = 0; i < femaleNames.length; i += 1) {
      let originsIndex = Math.floor(Math.random() * 4);
      names.push({
        name: femaleNames[i].slice(0, femaleNames[i].length - 1),
        gender: "f",
        origin: origins[originsIndex],
      });
    }

    console.log(names);
    return await models.Name.create(names);

    // names.push({
    //   name,
    //   gender: genders[genderIndex],
    //   origin: origins[originsIndex],
    // });
    //}
  },
});
