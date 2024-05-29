const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const uploadPDF = require("../middleware/uploadPdf");
const userController = require("../controllers/userController");

router.get("/profile/:userId", userController.getProfile);
router.get("/profilePic/:userId", userController.getProfilePic);
router.post(
  "/updateProfilePic/:userId",
  upload.single("profilePic"),
  userController.updateProfilePic
);
router.post("/updateUserInfo/:userId", userController.updateUserInfo);
router.post(
  "/uploadCNIC/:userId",
  uploadPDF.single("idCard"),
  userController.uploadCNIC
);
router.post(
  "/uploadVerificationRequest",
  uploadPDF.single("idCardFile"),
  userController.uploadVerificationRequest
);

module.exports = router;
