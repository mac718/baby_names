const express = require("express");
const router = express.Router();
const { getNames } = require("../controllers/names");
const checkToken = require("../middleware/auth");

router.use("/", checkToken);
router.route("/").get(getNames);

module.exports = router;
