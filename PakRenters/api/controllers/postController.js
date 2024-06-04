const mongoose = require("mongoose");
const Post = require("../models/PostDetails");
const User = require("../models/UserDetails");
const Vehicle = require("../models/VehicleSchema");
const FeatureDetails = require("../models/FeatureDetails");
const Bookings = require("../models/BookingSchema");

exports.createPostWithVehicle = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userId } = req.params;
    console.log(userId);
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
    // let updatedPostId = postId.toString().concat(user.posts.length + 1);

    const newVehicle = new Vehicle({
      postId,
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
      postId,
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
    console.log("Hello");
    res.status(201).json({
      success: true,
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
exports.getFeaturedPostIds = async (req, res) => {
  try {
    const featuredPostIds = await Post.find({
      isFeatured: true,
      status: true
    }).select("_id");
    res.status(200).json({ success: true, data: featuredPostIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Controller method to get featured posts
exports.getNotFeaturedPostIds = async (req, res) => {
  try {
    const featuredPostIds = await Post.find({
      isFeatured: false,
      status: true
    }).select("_id");
    res.status(200).json({ success: true, data: featuredPostIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getPostIdsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ user: userId }).populate(
      "user vehicleId bookings"
    );
    res.status(200).json({ success: true, data: userPosts });
  } catch (error) {
    console.error(+error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const featuredPosts = await Post.findById(postId).populate(
      "user vehicleId bookings"
    );
    res.status(200).json({ success: true, data: featuredPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getFilteredPostIds = async (req, res) => {
  try {
    const { filterType } = req.params;
    const { filter } = req.body;
    let filteredPostIds;
    switch (filterType) {
      case "category":
        filteredPostIds = await Post.find({ category: filter }).select("_id");
        break;
    }

    res.status(200).json({ success: true, data: filteredPostIds });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deletePostWithVehicle = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { postId } = req.params;

    // Find the post
    const post = await Post.findById(postId).session(session);
    if (!post) {
      throw new Error("Post not found");
    }

    // Find the associated vehicle
    const vehicle = await Vehicle.findById(post.vehicleId).session(session);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    // Delete the vehicle and post
    await Vehicle.deleteOne({ _id: vehicle._id }).session(session);
    await Post.deleteOne({ _id: post._id }).session(session);

    // Remove the post reference from the user
    await User.updateOne(
      { _id: post.user },
      { $pull: { posts: postId } },
      { session }
    );

    // Remove the post from all users' favorites
    await User.updateMany(
      { favorites: postId },
      { $pull: { favorites: postId } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Post and Vehicle deleted successfully"
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting post and vehicle:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.snoozePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { update } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    post.status = update;
    await post.save();
    let snoozed = "snoozed";
    if (update == true) {
      snoozed = "unsnoozed";
    }
    res.status(201).json({
      success: true,
      message: `Post ${snoozed} successfully`
    });
  } catch (error) {
    console.error("Error snoozing post:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { postId } = req.params;
    const { update } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    post.availability = update;
    await post.save();
    let available = "unavailable";
    if (update) {
      available = "available";
    }
    res.status(201).json({
      success: true,
      message: `Post ${available}`
    });
  } catch (error) {
    console.error("Error snoozing post:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updateFeatureDetails = async (req, res) => {
  try {
    const { postId } = req.params;
    const { days, charges } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      res.status(400).json({ success: false, message: "Post not found" });
    }
    const currentDate = new Date();
    const validTill = new Date();
    validTill.setDate(currentDate.getDate() + days);

    // Create the new feature details
    const newFeature = new FeatureDetails({
      charges,
      validFrom: currentDate,
      validTill: validTill
    });

    await newFeature.save();
    post.featuredDetails = newFeature._id;
    post.isFeatured = true;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Congratulation! Your post is featured."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add featuring to your post. Try again later"
    });
  }
};

exports.addBooking = async (req, res) => {
  try {
    const { postId } = req.params;
    const {
      renterId,
      customerId,
      startDate,
      endDate,
      days,
      rentPerDay,
      totalRent,
      payableSurcharge
    } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
    }

    const newBooking = new Bookings({
      renter: renterId,
      customer: customerId,
      post: post._id,
      startDate,
      endDate,
      days,
      rentPerDay,
      totalRent,
      payableSurcharge
    });

    await newBooking.save();
    post.bookings.push(newBooking._id);
    post.save();
    res.status(200).json({ success: true, message: "Booking Successful" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error booking. Server issue" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { postId } = req.params;
    const PostWithBookings = await Bookings.find({ post: postId }).populate(
      "customer"
    );
    if (!PostWithBookings) {
      return res
        .status(404)
        .json({ success: false, message: "No bookings found" });
    }
    res.status(200).json({
      success: true,
      message: "Bookings found",
      data: PostWithBookings
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching bookings"
    });
  }
};

exports.addNewComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, comment, rating } = req.body;
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
    }
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    post.comments.push({
      user: userId,
      comment: comment,
      rating: rating,
      createdOn: new Date()
    });
    await post.save();
    res
      .status(200)
      .json({ success: true, message: "Comment posted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
