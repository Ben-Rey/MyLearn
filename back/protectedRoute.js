const express = require("express");

const ProtectedRoutes = express.Router();

ProtectedRoutes.use((req, res, next) => {
  // check header for the token

  var token = req.headers.authorization;

  // decode token
  if (token) {
    next();
    //   // verifies secret and checks if the token is expired
    //   jwt.verify(token, app.get("Secret"), (err, decoded) => {
    //     if (err) {
    //       return res.json({ message: "invalid token" });
    //     } else {
    //       // if everything is good, save to request for use in other routes
    //       req.decoded = decoded;
    //       next();
    //     }
    //   });
    // } else {
    //   // if there is no token

    //   res.send({
    //     message: "No token provided."
    //   });
  }
});

module.exports = ProtectedRoutes;
