const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  rentPerDay: {
    type: Number,
    required: true
  },
  totalRent: {
    type: Number,
    required: true
  },
  payableSurcharge: {
    type: Number,
    required: true
  }
});

const Booking = mongoose.model("Bookings", BookingSchema);
module.exports = Booking;
