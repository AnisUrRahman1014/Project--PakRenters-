require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("Error connecting to MongoDB:", error));

// Import routes
const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// const vehicleRoutes = require("./routes/vehicleRoutes");
// const verificationRoutes = require("./routes/verificationRoutes");

// Use routes
app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/verifications", verificationRoutes);

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
