const express = require("express");
const router = express.Router();

router.route("/users").post(createUser);
router.route("/ratings").get(getUserRatings);
router.route("/").post(saveRating);
router.route("/").patch(updateRating);

module.exports = router;
