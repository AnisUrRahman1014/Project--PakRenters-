const express = require("express");
const router = express.Router();
const Chat = require("../../models/chat");
const auth = require("../../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [{ user1: req.user._id }, { user2: req.user._id }]
    });
    if (!chats) return res.status(400).send("No chats found!");
    return res.send(chats);
  } catch (err) {
    return res.status(500).send("Somthing went Wrong!");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(400).send("No chat found with given id!");
    return res.send(chat);
  } catch (err) {
    res.status(500).send("Somthing went wrong!");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const chat = await Chat.find({
      $or: [
        { $and: [{ user1: req.user._id }, { user2: req.body.user }] },
        { $and: [{ user1: req.body.user }, { user2: req.user._id }] }
      ]
    });
    if (chat.length > 0) return res.status(400).send("Chat already exists!");
    const newChat = new Chat();
    newChat.user1 = req.user._id;
    newChat.user2 = req.body.user;
    await newChat.save();
    return res.send(newChat);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Somthing went wrong!");
  }
});

module.exports = router;
