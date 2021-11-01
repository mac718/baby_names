const express = require("express");
const router = express.Router();
const sendLinkEmail = require("../controllers/emails");
const checkToken = require("../middleware/auth");

router.route("/").post(checkToken, sendLinkEmail);

module.exports = router;
