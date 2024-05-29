const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    user1: String,
    user2: String,
  },
  { timestamps: true }
);

// chatSchema.index(
//   { users: 1 },
//   { unique: true, partialFilterExpression: { users: { $exists: true } } }
// );

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
