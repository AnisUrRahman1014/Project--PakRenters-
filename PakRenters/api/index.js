const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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

  await newUser.save();

  //send verification email
  sendVerificationEmail(newUser.email, newUser.verificationToken);

  res.status(202).json({
    message:
      "Registration successful. Please check your email for verification."
  });
  try {
    await user.create({
      username: username,
      email: email,
      password: hashedPassword,
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

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "anisrahman1014@gmail.com",
      pass: "ddth mhvt iktd rhha"
    }
  });
  const mailOptions = {
    from: "PakRenters@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: https://localhost:8000/verify/${verificationToken}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification mail sent");
  } catch (err) {
    console.log("Error sending verification email");
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
    const existingUser = await user.findOne({
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

    // Here you might want to generate a token or perform other login success actions
    res.send({ status: "OK", data: "User successfully logged in" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error });
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
