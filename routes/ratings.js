const express = require("express");
const {
  getRatings,
  saveRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratings");
const router = express.Router();

router
  .route("/")
  .get(getRatings)
  .post(saveRating)
  .patch(updateRating)
  .delete(deleteRating);

module.exports = router;
