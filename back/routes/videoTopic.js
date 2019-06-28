const express = require("express");
const router = express.Router();
const axios = require("axios");
const VideoTopic = require("../models/videoTopic");

router.get("/get", (req, res) => {
  VideoTopic.find({ user: req.query.user }).then(result => {
    res.send(result);
  });
  // VideoTopic.find().then(result => {
  //   result.forEach(element => {
  //     // console.log(element);
  //     VideoTopic.findOne({ _id: element._id }, function(err, doc) {
  //       console.log(doc);
  //       doc.user = 'gro.lard@gmail.com';
  //      doc.save();
  //     });
  //   });
  // });
});

router.post("/add", (req, res) => {
  const NewVideoTopic = new VideoTopic();
  NewVideoTopic.topic = req.body.params.topic;
  NewVideoTopic.user = req.body.params.user;

  VideoTopic.findOne({
    topic: NewVideoTopic.topic
  })
    .catch(err => {
      console.log(err);
    })
    .then(topic => {
      if (topic) {
        res.send({ message: "topicExist" });
      } else {
        NewVideoTopic.save().then(() => {
          // gerer gestion erreur
          res.send({ message: "topicOk" });
        });
      }
    });
});

module.exports = router;
