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

// require("./models/UserDetails");
// const user = mongoose.model("User");

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
  newUser.password = hashedPassword;
  try {
    // Attempt to save the new user in the database
    await newUser.save();

    // Send a verification email if the user was saved successfully
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    // Respond with a success message
    res.status(202).json({
      message:
        "Registration successful. Please check your email for verification."
    });
  } catch (error) {
    // Log the error or handle it as necessary
    console.error("Error saving user:", error);

    // Respond with an error message
    res.status(500).json({
      message: "Registration failed. Please try again."
    });
  }
  // try {
  //   await user.create({
  //     username: username,
  //     email: email,
  //     password: hashedPassword,
  //     phoneNumber: phoneNumber,
  //     profilePic: profilePic,
  //     province: province,
  //     city: city,
  //     cnic: cnic
  //   });
  //   res.send({ status: "OK", data: "User Registered" });
  // } catch (error) {
  //   res.send({ status: "error", data: error });
  // }
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
    from: "anisrahman1014@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: https://192.168.1.13:8000/verify/${verificationToken}`
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

    // Here you might want to generate a token or perform other login success actions
    res.send({ status: "OK", data: "User successfully logged in" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error });
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
