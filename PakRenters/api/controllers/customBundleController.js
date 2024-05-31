const mongoose = require("mongoose");
const CustomBundleRequest = require("../models/CustomBundleSchema");
const User = require("../models/UserDetails");

exports.postRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { request } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const newRequest = new CustomBundleRequest({
      user: userId,
      request,
      createdOn: new Date()
    });
    await newRequest.save();
    res.status(201).json({ success: true, message: "Request successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log(error);
  }
};
