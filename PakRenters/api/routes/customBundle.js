const express = require("express");
const router = express.Router();
const customBundleController = require("../controllers/customBundleController");

router.post("/postRequest/:userId", customBundleController.postRequest);

module.exports = router;
