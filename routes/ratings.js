const express = require("express");
const {
  getRatings,
  saveRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratings");
const router = express.Router();
const checkToken = require("../middleware/auth");

router.use("/", checkToken);

router
  .route("/")
  .get(getRatings)
  .post(checkToken, saveRating)
  .patch(updateRating)
  .delete(deleteRating);

module.exports = router;
