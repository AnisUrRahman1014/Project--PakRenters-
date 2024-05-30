const Chat = require("../models/chat");

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [{ user1: req.user._id }, { user2: req.user._id }]
    });
    if (!chats) return res.status(400).send("No chats found!");
    return res.send(chats);
  } catch (err) {
    return res.status(500).send("Something went wrong!");
  }
};

const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(400).send("No chat found with given id!");
    return res.send(chat);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const checkOrCreateChat = async (req, res) => {
  try {
    console.log("HELLO");
    const { user } = req.body;

    if (!user) {
      return res.status(400).send("User ID is required");
    }

    const existingChat = await Chat.findOne({
      $or: [
        { $and: [{ user1: req.user._id }, { user2: user }] },
        { $and: [{ user1: user }, { user2: req.user._id }] }
      ]
    });

    if (existingChat) {
      return res.status(200).send({ chatId: existingChat._id });
    }

    const newChat = new Chat({
      user1: req.user._id,
      user2: user
    });
    await newChat.save();
    return res.status(201).send(newChat);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong!");
  }
};

module.exports = {
  getChats,
  getChatById,
  checkOrCreateChat
};
