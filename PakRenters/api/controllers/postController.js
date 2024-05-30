const mongoose = require("mongoose");
const Post = require("../models/PostDetails");
const User = require("../models/UserDetails");
const Vehicle = require("../models/VehicleSchema");
const path = require("path");

exports.createPostWithVehicle = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userId } = req.params;
    const {
      postId,
      title,
      description,
      category,
      rentPerDay,
      location,
      make,
      model,
      year,
      transmission,
      engine,
      ac,
      cruise,
      seatingCapacity,
      abs,
      services
    } = req.body;
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found");
    }
    const imageFiles = req.files;
    const imagePaths = imageFiles.map(file => file.path);
    let updatedPostId = postId.toString().concat(user.posts.length + 1);

    const newVehicle = new Vehicle({
      postId: updatedPostId,
      make,
      model,
      year,
      transmission,
      engine,
      ac: ac === "true",
      cruise: cruise === "true",
      seatingCapacity: parseInt(seatingCapacity),
      abs: abs === "true",
      images: imagePaths
    });
    const savedVehicle = await newVehicle.save({ session });
    const parsedServices = JSON.parse(services);

    const newPost = new Post({
      postId: updatedPostId,
      user: userId,
      title,
      description,
      category,
      rentPerDay,
      location,
      vehicleId: savedVehicle._id,
      services: parsedServices,
      createdOn: new Date()
    });
    const savedPost = await newPost.save({ session });
    user.posts.push(savedPost._id);
    await user.save();
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Post and Vehicle created successfully",
      post: savedPost,
      vehicle: savedVehicle
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating post and vehicle:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Controller method to get featured posts
exports.getFeaturedPosts = async (req, res) => {
  try {
    const featuredPosts = await Post.find({ isFeatured: false }).populate(
      "user vehicleId"
    );
    res.status(200).json({ success: true, data: featuredPosts });
  } catch (error) {
    console.error("Hello" + error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
