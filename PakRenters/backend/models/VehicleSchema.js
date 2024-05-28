const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  ac: {
    type: Boolean,
    required: true
  },
  abs: {
    type: Boolean,
    required: true
  },
  cruise: {
    type: Boolean,
    required: true
  },
  seatingCapacity: {
    type: Number,
    required: true
  },
  engine: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      ref: "uploads"
    }
  ]
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
