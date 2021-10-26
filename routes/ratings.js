const express = require("express");
const {
  getRatings,
  saveRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratings");
const router = express.Router();
const checkToken = require("../middleware/auth");

router
  .route("/")
  .get(checkToken, getRatings)
  .post(checkToken, saveRating)
  .patch(checkToken, updateRating)
  .delete(checkToken, deleteRating);

module.exports = router;
