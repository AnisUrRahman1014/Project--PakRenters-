const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    phoneNumber: {
      type: String,
      required: true
    },
    profilePic: {
      type: Buffer,
      required: false
    },
    cnic: {
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
    }
  },
  { collection: "User" }
);

mongoose.model("User", userSchema);
