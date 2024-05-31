const mongoose = require("mongoose");

const CustomBundleRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  request: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const CustomBundleRequest = mongoose.model(
  "CustomBundles",
  CustomBundleRequestSchema
);
module.exports = CustomBundleRequest;
