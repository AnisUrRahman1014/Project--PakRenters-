const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const auth = require("../middleware/auth");

router.get("/getChats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({
      $or: [{ user1: userId }, { user2: userId }]
    });
    console.log("hello: " + chats);
    if (!chats)
      return res
        .status(400)
        .json({ success: false, message: "No chats founds" });
    res.status(200).json({ success: true, chats: chats });
  } catch (err) {
    return res.status(500).send("Somthing went Wrong!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(400).send("No chat found with given id!");
    return res.send(chat);
  } catch (err) {
    res.status(500).send("Somthing went wrong!");
  }
});

router.post("/checkOrCreateChat", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const chat = await Chat.find({
      $or: [
        { $and: [{ user1: senderId }, { user2: receiverId }] },
        { $and: [{ user1: receiverId }, { user2: senderId }] }
      ]
    });
    if (chat.length > 0) {
      const newChat = await Chat.findById(chat[0]._id);
      console.log(newChat);
      res.status(200).json({ success: true, chatId: newChat._id });
    } else {
      const newChat = new Chat();
      newChat.user1 = senderId;
      newChat.user2 = receiverId;
      await newChat.save();
      res.status(200).json({ success: true, chatId: newChat._id });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
