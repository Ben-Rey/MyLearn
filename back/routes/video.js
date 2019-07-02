const express = require("express");
const router = express.Router();
const axios = require("axios");
const Video = require("../models/video");
var ObjectId = require("mongodb").ObjectID;

const credential = "AIzaSyB6WEtKGVmi1P9jFdy8zSwUXpcT_H-2vDY";

// getInfoVideo("https://www.youtube.com/watch?v=Ks-_Mh1QhMc");

//-------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/add", (req, res) => {
  // const VideoUrl = "https://www.dailymotion.com/video/x79wqxr";
  //console.log(req.body);
  const user = req.body.user;
  const VideoUrl = req.body.videoUrl;
  const topic = req.body.topic ? req.body.topic : req.body["topic[]"];
  if (!topic.includes("all")) {
    topic.unshift("all");
  }
  const video = parseURL(VideoUrl);
  const NewVideo = new Video();

  if (video.type === "youtube") {
    getInfoYoutubeAPI(video.id, credential)
      .then(resultfromApi => {
        const videoResult = resultfromApi[0].snippet;
        NewVideo.user = user;
        NewVideo.videoUrl = VideoUrl;
        NewVideo.title = videoResult.title;
        NewVideo.videoThumbnail = videoResult.thumbnails.high.url;
        NewVideo.webSite = video.type;
        NewVideo.topic = topic;
      })
      .then(() => {
        Video.findOne({
          title: NewVideo.title
        })
          .catch(err => {
            console.log(err);
          })
          .then(video => {
            if (video) {
              res.send({ message: "VideoExist" });
            } else {
              NewVideo.save().then(() => {
                // gerer gestion erreur
                res.send({ message: "VideoOk" });
              });
            }
          });
      });
  } else if (video.type === "inconnu") {
    res.send({ message: "VideoNotOk" });
  }

  ///Vimeo

  if (video.type === "vimeo") {
    getInfoVimeoAPI(video.id)
      .then(resultfromApi => {
        console.log(resultfromApi);
        const videoResult = resultfromApi;
        NewVideo.user = user;
        NewVideo.videoUrl = VideoUrl;
        NewVideo.title = videoResult.title;
        NewVideo.videoThumbnail = videoResult.thumbnail_url;
        NewVideo.webSite = video.type;
      })
      .then(() => {
        Video.findOne({
          title: NewVideo.title
        })
          .catch(err => {
            console.log(err);
          })
          .then(video => {
            if (video) {
              res.send({ message: "VideoExist" });
              console.log("La video a deja été enregistré");
            } else {
              NewVideo.save().then(() => {
                // gerer gestion erreur
                console.log("video Inserer");
                res.send({ message: "VideoOk" });
              });
            }
          });
      });
  } else if (video.type === "inconnu") {
    res.send({ message: "VideoNotOk" });
  }
});

//Proteger route pour que l'acces soit privé

router.get("/get", (req, res) => {
  Video.find({ user: req.query.user }).then(result => {
    res.send(result);
  });
});

//Proteger route pour que l'acces soit privé
router.delete("/delete", (req, res) => {
  Video.deleteOne(
    { _id: ObjectId(req.query._id), user: req.query.user },
    function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send("video deleted");
      }
      // deleted at most one tank document
    }
  );
});

//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------

function getInfoYoutubeAPI(videoID, credential) {
  result = axios
    .get(urlInfoYtVideo(credential, videoID))
    .then(function(response) {
      // handle success
      //console.log(response.data.items)
      return (result = response.data.items);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });

  return result;
}

function getInfoVimeoAPI(videoID) {
  result = axios
    //console.log("result")

    .get(urlInfoVimeoVideo(videoID))
    .then(function(response) {
      // handle success

      return (result = response.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
  //console.log(result);

  return result;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------

function urlInfoYtVideo(credential, videoID) {
  return `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${credential}`;
}

function urlInfoVimeoVideo(videoID) {
  return (
    "https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F" + videoID
  );
}

//-------------------------------------------------------------------------------------------------------------------------------------------------

function parseURL(url) {
  console.log(url);
  url.match(
    /(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|dailymotion\.com|watch\.com|youtu(be\.com|\.be|be\.googleapis\.com)|)\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  );
  if (RegExp.$3.indexOf("youtu") > -1) {
    var type = "youtube";
  } else if (RegExp.$3.indexOf("vimeo") > -1) {
    var type = "vimeo";
  } else if (RegExp.$3.indexOf("dailymotion") > -1) {
    var type = "daylimotion";
  } else {
    var type = "inconnu";
  }
  return {
    type: type,
    id: RegExp.$6
  };
}

module.exports = router;
