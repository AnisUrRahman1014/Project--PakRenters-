const User = require("../models/UserDetails");
const VerificationRequests = require("../models/VerificationRequests");
const nodeMailer = require("nodemailer");
const path = require("path");

exports.getProfile = async (req, res) => {
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

exports.getProfilePic = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user || !user.profilePic) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    res.sendFile(path.resolve(user.profilePic));
  } catch (err) {
    res.status(500).json({ message: "Error retrieving profile picture" });
  }
};

exports.updateProfilePic = async (req, res) => {
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

exports.updateUserInfo = async (req, res) => {
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

exports.uploadCNIC = async (req, res, next) => {
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
    res.status(500).json({ message: error });
  }
};

const sendVerificationRequestEmail = async (email, whatsappNumber) => {
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

exports.uploadVerificationRequest = async (req, res, next) => {
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
    sendVerificationRequestEmail(user.email, whatsappNumber);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error
    });
  }
};
