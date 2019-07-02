//import
const express = require("express");
const ProtectedRoutes = require("./protectedRoute");
const path = require("path");

var colors = require("colors");

// Import the library:
var cors = require("cors");

//DataBAse
const mongoose = require("mongoose");
const config = require("./db");

// Import Body parser
const bodyParser = require("body-parser");
//Import passport
const passport = require("passport");

const users = require("./routes/user");
const video = require("./routes/video");
const videoTopic = require("./routes/videoTopic");

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => console.log("Database is connected".trap.america),
  err => {
    console.log("Can not connect to the database" + err);
  }
);

//instance server
const server = express();
server.use(express.static(path.join(__dirname, "build")));

// Then use it before your routes are set up:
server.use(cors());
server.use(passport.initialize());
require("./passport")(passport);

// Configure bodyparser to handle post requests
// server.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );
// server.use(bodyParser.json());

// Configure bodyparser to handle post requests
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json());
server.use("/service/", ProtectedRoutes);
server.use("/api/users", users);
server.use("/service/video", video);
server.use("/service/videoTopic", videoTopic);

//routes
server.get("/*", function(req, res) {
  // res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//launch server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.rainbow.bold);
});
