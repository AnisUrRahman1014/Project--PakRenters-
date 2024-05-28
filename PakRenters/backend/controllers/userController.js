const User = require("../models/UserDetails");
const VerificationRequests = require("../models/VerificationRequests");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");

const registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    phoneNumber,
    province,
    city,
    cnic
  } = req.body;

  const oldUser_username = await User.findOne({ username });
  const oldUser_email = await User.findOne({ email });
  const oldUser_phoneNumber = await User.findOne({ phoneNumber });

  if (oldUser_username || oldUser_email || oldUser_phoneNumber) {
    return res.send({ status: "error", data: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    phoneNumber,
    profilePic: req.file.path,
    province,
    city,
    cnic,
    verificationToken: crypto.randomBytes(20).toString("hex")
  });

  try {
    await newUser.save();
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.send({ status: "OK", data: "User Registered" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    port: 465,
    secure: true,
    debug: true
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
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

const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    res.status(500).json({ message: "Email verification failed" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!existingUser) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ status: "error", data: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send({ status: "error", data: error });
  }
};

const getUserProfile = async (req, res) => {
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
};

const updateUserProfilePic = async (req, res) => {
  try {
    const userId = req.params.userId;
    const filePath = req.file.path;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePic = filePath;
    await user.save();

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePic: filePath
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { phoneNo, cnic, province, city } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.phoneNo = phoneNo;
    user.cnic = cnic;
    user.province = province;
    user.city = city;

    await user.save();
    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadCnic = async (req, res) => {
  try {
    const filePath = req.file.path;
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.idCardPDF = filePath;
    await user.save();

    res.status(200).json({ message: "PDF uploaded successfully", filePath });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadVerificationRequest = async (req, res) => {
  try {
    const filePath = req.file.path;
    const { whatsappNumber, cnicNumber, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.idCardFile = filePath;
    user.save();

    const newRequest = new VerificationRequests({
      user,
      whatsappNumber,
      cnicNumber,
      idCardFile: filePath
    });
    await newRequest.save();

    res.status(200).json({
      message: "Request Posted Successfully",
      filePath
    });
    sendVerificationRequestEmail(newRequest.whatsappNumber);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const sendVerificationRequestEmail = async whatsappNumber => {
  const email = process.env.EMAIL_USER;
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    port: 465,
    secure: true,
    debug: true
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "PakRenters - Verification Request",
    text: `You have received a new verification request. Kindly contact ${whatsappNumber} asap.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification Request Sent");
  } catch (err) {
    console.log("Error sending verification request " + err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  getUserProfile,
  updateUserProfilePic,
  updateUserInfo,
  uploadCnic,
  uploadVerificationRequest
};
