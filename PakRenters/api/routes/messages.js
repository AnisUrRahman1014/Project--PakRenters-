const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const auth = require("../middlewares/auth");

router.get("/:chatId", auth, async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    if (!messages) return res.status(400).send("No messages found!");
    return res.send(messages);
  } catch (err) {
    return res.status(500).send("Somthing went Wrong!");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newMessage = new Message({
      chatId: req.body.chatId,
      message: req.body.message,
      sender: req.user._id,
    });
    await newMessage.save();
    return res.send(newMessage);
  } catch (err) {
    return res.status(500).send("Somthing went wrong!");
  }
});

module.exports = router;
