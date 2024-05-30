const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  phoneNumber: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: false
  },
  cnic: {
    type: String,
    required: false
  },
  idCardPDF: {
    type: String,
    required: false
  },
  province: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  reputation: {
    type: Number,
    default: 0
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
