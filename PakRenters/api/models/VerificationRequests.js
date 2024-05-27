const mongoose = require("mongoose");

const VerificationRequestsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  whatsappNumber: {
    type: String,
    required: true
  },
  cnicNumber: {
    type: String,
    required: true,
    unique: true
  },
  idCardFile: {
    type: String,
    ref: "uploads/pdf",
    required: true
  }
});

const VerificationRequests = mongoose.model(
  "VerificationRequests",
  VerificationRequestsSchema
);
module.exports = VerificationRequests;
