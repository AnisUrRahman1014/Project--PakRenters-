const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
// const auth = require("../middleware/auth");

router.get("/", chatController.getChats);
router.get("/:id", chatController.getChatById);
router.post("/checkOrCreateChat", chatController.checkOrCreateChat);

module.exports = router;
