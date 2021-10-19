const express = require("express");
const router = express.Router();
const { getNames } = require("../controllers/names");

router.route("/").get(getNames);

module.exports = router;
