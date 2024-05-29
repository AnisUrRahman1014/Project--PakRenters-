require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the database"))
  .catch(error => console.log("Error connecting to MongoDB", error));

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const vehicleRoutes = require("./routes/vehicle");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/vehicle", vehicleRoutes);

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
