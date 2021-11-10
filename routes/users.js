const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  getUser,
  updateUser,
  getLinkedUsers,
  addPendingLinkedUserSent,
  addLinkedUser,
  deleteLinkedUser,
  signOut,
} = require("../controllers/users");
const checkToken = require("../middleware/auth");

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/request-link").post(checkToken, addPendingLinkedUserSent);
router.route("/getUser").get(checkToken, getUser);
router.route("/linked").get(checkToken, getLinkedUsers);
router.route("/confirm-link").post(checkToken, addLinkedUser);
router.route("/").patch(checkToken, updateUser);
router.route("/delete-link/:id").delete(checkToken, deleteLinkedUser);
router.route("/sign-out").delete(signOut);
router.get("/checkToken", checkToken, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
