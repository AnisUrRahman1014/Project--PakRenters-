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
const chatRoute = require("./routes/chats");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/chats", chatRoute);

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

let server = app.listen(port, () => {
  console.log("Server is running on port", port);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: [
      "http://192.168.0.116:8081",
      "http://localhost:19006",
      "http://localhost:19007",
      "http://localhost:19008",
      "http://localhost:3001",
      "http://localhost:8081",
      "http://localhost:8081",
      "http://192.168.1.13:8081"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on("connection", socket => {
  console.log("New client connected");
  socket.on("setup", id => {
    console.log("USER CONNECTED" + id);
    socket.join(id);
    socket.emit("connected");
  });

  socket.on("join chat", room => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", newMessageRecieved => {
    console.log(newMessageRecieved);
    let chat = newMessageRecieved.chatId;
    socket.in(chat).emit("message recieved", newMessageRecieved);
    // if (!chat.users) return console.log("chat.users not defined");
    // chat.users.forEach((user) => {
    //   if (user._id == newMessageRecieved.sender._id) return;
    //   socket.in(user._id).emit("message recieved", newMessageRecieved);
    // });
  });

  socket.off("setup", userData => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
