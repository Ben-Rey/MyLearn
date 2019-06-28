const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: false
    },
    videoUrl: {
      type: String,
      required: true
    },
    videoThumbnail: {
      type: {},
      required: true
    },
    webSite: {
      type: String,
      required: false
    },
    topic: {
      type: [],
      required: false
    }
  },
  {
    collection: "video"
  }
);

const Video = mongoose.model("video", VideoSchema);

module.exports = Video;
