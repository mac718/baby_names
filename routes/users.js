const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  getUser,
  updateUser,
} = require("../controllers/users");
const checkToken = require("../middleware/auth");

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/getUser").get(checkToken, getUser);
router.route("/").patch(checkToken, updateUser);
router.get("/checkToken", checkToken, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
