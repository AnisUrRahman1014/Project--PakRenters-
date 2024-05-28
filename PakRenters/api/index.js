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
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to the database"))
  .catch(error => {
    console.log("Error connecting to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

const upload = require("./middleware/upload");
app.use("/uploads", express.static("uploads"));

// Authentication middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

app.post("/register", upload.single("profilePic"), async (req, res, next) => {
  const {
    username,
    email,
    password,
    phoneNumber,
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
    password: hashedPassword,
    phoneNumber,
    profilePic: req.file.path,
    province,
    city,
    cnic,
    verificationToken: crypto.randomBytes(20).toString("hex")
  });

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
    // Send the profile picture file
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

// Serve profile picture
app.get("/profilePic/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user || !user.profilePic) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    // Send the profile picture file
    res.sendFile(path.resolve(user.profilePic));
  } catch (err) {
    res.status(500).json({ message: "Error retrieving profile picture" });
  }
});

// Update profile picture endpoint
app.post(
  "/updateProfilePic/:userId",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const filePath = req.file.path; // Path of the uploaded file

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user's profile picture path
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
  }
);

// Update user information endpoint
app.post("/updateUserInfo/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { phoneNo, cnic, province, city } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user information
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
});

const uploadPDF = require("./middleware/uploadPdf");

app.post(
  "/uploadCNIC/:userId",
  uploadPDF.single("idCard"),
  async (req, res, next) => {
    try {
      const filePath = req.file.path;
      const userId = req.params.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Here you might want to save the filePath to the user's document record in the database
      user.idCardPDF = filePath;
      await user.save();

      res
        .status(200)
        .json({ message: "PDF uploaded successfully", filePath: filePath });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Upload in VerificationRequests
const VerificationRequests = require("./models/VerificationRequests");
app.post(
  "/uploadVerificationRequest/",
  uploadPDF.single("idCardFile"),
  async (req, res, next) => {
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
        filePath: filePath
      });
      sendVerificationRequestEmail(newRequest.whatsappNumber);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error
      });
    }
  }
);

const sendVerificationRequestEmail = async whatsappNumber => {
  email = "anisrahman1014@gmail.com";
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

const Vehicle = require("./models/VehicleSchema");
const Post = require("./models/PostDetails");
app.post(
  "/createPostWithVehicle/:userId",
  upload.array("images"),
  async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { userId } = req.params;
      const {
        postId,
        title,
        description,
        rentPerDay,
        location,
        make,
        model,
        year,
        transmission,
        engine,
        ac,
        cruise,
        seatingCapacity,
        abs,
        services
      } = req.body;
      console.log(services);

      // Update the user's posts array with the new post
      const user = await User.findById(userId).session(session);
      if (!user) {
        throw new Error("User not found");
      }

      // Assuming `req.files` contains the uploaded files
      const imageFiles = req.files;
      const imagePaths = imageFiles.map(file => file.path);
      let updatedPostId = postId.toString().concat(user.posts.length);

      // Create a new vehicle document
      const newVehicle = new Vehicle({
        postId: updatedPostId,
        make,
        model,
        year,
        transmission,
        engine,
        ac: ac === "true",
        cruise: cruise === "true",
        seatingCapacity: parseInt(seatingCapacity),
        abs: abs === "true",
        images: imagePaths
      });

      // Save the vehicle document
      const savedVehicle = await newVehicle.save({ session });

      // Ensure services is parsed if it's sent as a JSON string
      const parsedServices = JSON.parse(services);

      const newPost = new Post({
        postId: updatedPostId,
        user: userId,
        title,
        description,
        rentPerDay,
        location,
        vehicleId: savedVehicle._id,
        services: parsedServices, // Directly use parsedServices
        createdOn: new Date()
      });

      // Save the post document
      const savedPost = await newPost.save({ session });

      user.posts.push(savedPost._id);
      await user.save();

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Respond with success message and saved post data
      res.status(201).json({
        message: "Post and Vehicle created successfully",
        post: savedPost,
        vehicle: savedVehicle
      });
    } catch (error) {
      // If an error occurred, abort the transaction
      await session.abortTransaction();
      session.endSession();
      console.error("Error creating post and vehicle:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

app.get("/vehicles/:postId", async (req, res) => {
  // Notice the plural form 'vehicles'
  try {
    const vehicleId = req.params.vehicleId;
    console.log(vehicleId);

    // Find the vehicle document based on the postId
    const vehicle = await Vehicle.findOne({ vehicleId });
    console.log(vehicle);

    // If vehicle found, return its _id
    if (vehicle) {
      console.log(vehicle._id);
      res.status(200).json({ vehicleId: vehicle._id });
    } else {
      // If vehicle not found, return appropriate message
      console.log("Vehicle not found");
      res
        .status(404)
        .json({ message: "Vehicle not found for the given postId" });
    }
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
