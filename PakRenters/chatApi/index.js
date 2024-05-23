const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");

const Port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

http.listen(Port, () => {
  console.log("Server is listening on" + Port);
});
