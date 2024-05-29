const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const postController = require("../controllers/postController");

router.post(
  "/createPostWithVehicle/:userId",
  upload.array("images"),
  postController.createPostWithVehicle
);

module.exports = router;
