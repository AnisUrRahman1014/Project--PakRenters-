require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to the database"))
  .catch(error => {
    console.log("Error connecting to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

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

  const oldUser_username = await User.findOne({ username: username });
  const oldUser_email = await User.findOne({ email: email });
  const oldUser_phoneNumber = await User.findOne({ phoneNumber: phoneNumber });

  if (oldUser_username || oldUser_email || oldUser_phoneNumber) {
    return res.send({ status: "error", data: "User already exists" });
  }

  // Hash password before saving it to the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password,
    phoneNumber,
    profilePic,
    province,
    city,
    cnic
  });

  newUser.verificationToken = crypto.randomBytes(20).toString("hex");
  newUser.password = hashedPassword;
  try {
    // Attempt to save the new user in the database
    await newUser.save();

    // Send a verification email if the user was saved successfully
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    // Respond with a success message
    res.send({ status: "OK", data: "User Registered" });
  } catch (error) {
    // Log the error or handle it as necessary
    console.error("Error saving user:", error);
    // Respond with an error message
    res.status(500).json({
      message: "Registration failed. Please try again."
    });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "anisrahman1014@gmail.com",
      pass: "ddth mhvt iktd rhha"
    },
    port: 465,
    secure: true,
    debug: true
  });
  const mailOptions = {
    from: "anisrahman1014@gmail.com",
    to: email,
    subject: "PakRenters - Email Verification",
    text: `Please click the following link to verify your email: https://192.168.1.16:8000/verify/${verificationToken}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification mail sent");
  } catch (err) {
    console.log("Error sending verification email " + err);
  }
};

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    // marks the use as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "Verification successfull" });
  } catch (err) {
    res.status(500).json({ message: "Email verification failed" });
  }
});

const bcrypt = require("bcryptjs");
const User = require("./models/UserDetails");

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Finding the user by username or email
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: username }]
    });

    if (!existingUser) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    // Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ status: "error", data: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: existingUser._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send({ status: "error", data: error });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// FETCHING USER BASED ON USER ID
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

app.get("/posts/:userId", async (req, res) => {
  try {
    const loggedInUserId = req.params.userId;

    const loggedInUser = await User.findById(loggedInUserId).populate(
      "posts",
      "_id"
    );
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //get the ID's of the posts by this user
    const postIds = loggedInUser.posts.map(post => post._id);
  } catch (err) {
    console.log("Error retrieving users");
    res.status(500).json({ message: "Error retrieving users" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
