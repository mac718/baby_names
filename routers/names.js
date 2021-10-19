const express = require("express");
const router = express.Router();
const Name = require("../models/name");
const User = require("../models/user");
const { getNames } = require("../controllers/names");

router.route("/getNames").get(getNames);

module.exports = router;
