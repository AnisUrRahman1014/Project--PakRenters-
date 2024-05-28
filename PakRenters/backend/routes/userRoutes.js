const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const uploadPDF = require("../middleware/uploadPdf");
const {
  registerUser,
  loginUser,
  verifyEmail,
  getUserProfile,
  updateUserProfilePic,
  updateUserInfo,
  uploadCnic,
  uploadVerificationRequest
} = require("../controllers/userController");

// User registration
router.post("/register", upload.single("profilePic"), registerUser);

// User login
router.post("/login", loginUser);

// Email verification
router.get("/verify/:token", verifyEmail);

// Get user profile
router.get("/profile/:userId", getUserProfile);

// Update profile picture
router.post(
  "/updateProfilePic/:userId",
  upload.single("profilePic"),
  updateUserProfilePic
);

// Update user information
router.post("/updateUserInfo/:userId", updateUserInfo);

// Upload CNIC PDF
router.post("/uploadCNIC/:userId", uploadPDF.single("idCard"), uploadCnic);

// Upload Verification Request
router.post(
  "/uploadVerificationRequest",
  uploadPDF.single("idCardFile"),
  uploadVerificationRequest
);

module.exports = router;
