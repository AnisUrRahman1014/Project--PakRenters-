const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const upload = require("../middleware/upload");

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
    const { chatId, message, messageType, sender } = req.body;
    const newMessage = new Message({
      chatId,
      message,
      messageType,
      sender
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

router.post("/uploadMediaMessage", upload.single("media"), async (req, res) => {
  try {
    const { chatId, messageType, sender } = req.body;
    if (!req.file) {
      res.status(404).json({ success: false, message: "No file found" });
    }
    console.log(req.file.path);
    const newMessage = new Message({
      chatId,
      message: req.file.path,
      messageType,
      sender
    });
    await newMessage.save();
    res.status(200).json({ success: true, message: "Message sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
});

module.exports = router;
