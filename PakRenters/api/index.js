const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://anisrahman1014:zawsar123456@cluster0.if58lga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected to the database"))
  .catch(error => {
    console.log("Error connecting to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

require("./models/UserDetails");
const user = mongoose.model("User");

app.post("/register", async (req, res) => {
  const {
    username,
    email,
    password,
    phoneNumber,
    profilePic,
    province,
    city,
    cnic
  } = req.body;

  const oldUser_username = await user.findOne({ username: username });
  const oldUser_email = await user.findOne({ email: email });
  const oldUser_phoneNumber = await user.findOne({ phoneNumber: phoneNumber });

  if (oldUser_username || oldUser_email || oldUser_phoneNumber) {
    return res.send({ data: "User already exists" });
  }

  try {
    await user.create({
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      profilePic: profilePic,
      province: province,
      city: city,
      cnic: cnic
    });
    res.send({ status: "OK", data: "User Registered" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
