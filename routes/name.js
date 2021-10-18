const express = require("express");
const router = express.Router();

router.route("/").get(getNames);

module.exports = router;
