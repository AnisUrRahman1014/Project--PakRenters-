const express = require("express");
const router = express.Router();
const Message = require("../models/message");
// const auth = require("../middlewares/auth");

router.get("/getMessages/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    if (!messages) return res.status(400).send("No messages found!");
    res.status(200).json({ success: true, messages: messages });
  } catch (err) {
    return res.status(500).send("Something went Wrong!");
  }
});

router.post("/uploadNewMessage", async (req, res) => {
  try {
    const { chatId, message, sender } = req.body;
    const newMessage = new Message({
      chatId: chatId,
      message: message,
      sender: sender
    });
    await newMessage.save();
    res.status(200).json({ success: true, message: newMessage });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

router.get("/lastMessage/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const lastMessage = await Message.findOne({ chatId: chatId })
      .sort({ createdAt: -1 })
      .exec();
    console.log(lastMessage);
    if (!lastMessage) {
      return res
        .status(404)
        .json({ success: false, message: "No messages found" });
    }
    res.status(200).json({ success: true, message: lastMessage });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
