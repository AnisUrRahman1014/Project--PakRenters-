const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authController = require("../controllers/authController");

router.post("/register", upload.single("profilePic"), authController.register);
router.get("/verify/:token", authController.verifyEmail);
router.post("/login", authController.login);

module.exports = router;
