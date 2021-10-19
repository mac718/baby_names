const express = require("express");
const {
  getRatings,
  saveRating,
  updateRating,
} = require("../controllers/ratings");
const router = express.Router();

router.route("/").get(getRatings).post(saveRating).patch(updateRating);

module.exports = router;
