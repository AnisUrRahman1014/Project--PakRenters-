const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const postController = require("../controllers/postController");

router.post(
  "/createPostWithVehicle/:userId",
  upload.array("images"),
  postController.createPostWithVehicle
);
router.get("/getFeaturedPostIds", postController.getFeaturedPostIds);
router.get("/getPostById/:postId", postController.getPostById);
router.get("/getPostIdsByUserId/:userId", postController.getPostIdsByUserId);
router.post("/getFilteredPosts/:filterType", postController.getFilteredPostIds);
router.delete("/deletePost/:postId", postController.deletePostWithVehicle);
router.post("/snoozePost/:postId", postController.snoozePost);

module.exports = router;
