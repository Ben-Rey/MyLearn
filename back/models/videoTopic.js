const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoTopicSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  }
});

const VideoTopic = mongoose.model("videoTopic", VideoTopicSchema, "videoTopic");

module.exports = VideoTopic;
