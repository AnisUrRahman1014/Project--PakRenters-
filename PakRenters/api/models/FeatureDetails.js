const mongoose = require("mongoose");

const FeatureDetailsSchema = new mongoose.Schema({
  charges: {
    type: Number,
    required: true
  },
  validFrom: {
    type: Date,
    default: Date.now,
    required: true
  },
  validTill: {
    type: Date,
    required: true
  }
});

const FeatureDetails = mongoose.model("FeatureDetails", FeatureDetailsSchema);
module.exports = FeatureDetails;
