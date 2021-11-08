const express = require("express");
const {
  getRatings,
  saveRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratings");
const router = express.Router();
const checkToken = require("../middleware/auth");
const { route } = require("./users");

router.use("/", checkToken);

router
  .route("/")
  .post(checkToken, saveRating)
  .patch(updateRating)
  .delete(deleteRating);
router.route("/:id").get(getRatings);

module.exports = router;
