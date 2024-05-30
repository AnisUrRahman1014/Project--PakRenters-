const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const postController = require("../controllers/postController");

router.post(
  "/createPostWithVehicle/:userId",
  upload.array("images"),
  postController.createPostWithVehicle
);
router.get("/featured", postController.getFeaturedPosts);
router.get("/getPost/:postId", postController.getPostById);
router.get("/getPostByUserId/:userId", postController.getPostByUserId);

module.exports = router;
