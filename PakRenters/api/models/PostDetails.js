const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rentPerDay: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Vehicle"
  },
  comments: [
    {
      user: {
        type: mnogoose.Schema.Type.ObjectId,
        ref: "User"
      },
      text: String,
      createdOn: {
        type: Date,
        default: Date.now
      },
      likes: {
        type: Number,
        default: 0
      }
    }
  ],
  views: {
    type: Number,
    default: 0
  },
  services: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "Service"
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    }
  ]
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
