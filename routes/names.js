const express = require("express");
const router = express.Router();
const { getNames, getSingleName } = require("../controllers/names");
const checkToken = require("../middleware/auth");

router.use("/", checkToken);
router.route("/").get(getNames);
router.route("/:name").get(checkToken, getSingleName);

module.exports = router;
