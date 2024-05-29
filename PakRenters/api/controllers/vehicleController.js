const Vehicle = require("../models/VehicleSchema");

exports.getVehicle = async (req, res) => {
  try {
    const postId = req.params.postId;
    const vehicle = await Vehicle.findOne({ postId });
    if (vehicle) {
      res.status(200).json({ vehicleId: vehicle._id });
    } else {
      res
        .status(404)
        .json({ message: "Vehicle not found for the given postId" });
    }
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
