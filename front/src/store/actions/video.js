import axios from "axios";
import { GET_ALL_VIDEO, ADD_VIDEO, GET_TOPIC_LIST, ADD_TOPIC } from "./types";

/****************************************************************************
 *                                                                          *
 *                                VIDEO                                     *
 *                                                                          *
 ***************************************************************************/

export const getAllVideo = () => {
  return (dispatch, getState) => {
    axios
      .get("/service/video/get")
      .then(response => {
        dispatch({
          type: GET_ALL_VIDEO,
          payload: response.data
        });
      })
      .catch(error => console.log(error));
  };
};

export const addVideo = video => {
  console.log(video);
  return (dispatch, getState) => {
    axios
      .post("/service/video/add", {
        user: localStorage.user,
        videoUrl: video.Url,
        title: video.title,
        topic: video.videoTopic
      })
      .then(response => {
        dispatch({
          type: ADD_VIDEO,
          payload: response.data
        });
        return response;
      })
      .catch(error => console.log(error))
      .then(e => {
        if (e.data.message === "VideoOk") {
          dispatch(getAllVideo());
        }
        console.log(e);
      });
  };
};

export const deleteVideo = id => {
  return (dispatch, getState) => {
    axios
      .delete("/service/video/delete", {
        params: {
          user: localStorage.user,
          _id: id
        }
      })
      .then(response => {
        dispatch(getAllVideo());
      })
      .catch(error => console.log(error));
  };
};

/****************************************************************************
 *                                                                          *
 *                                TOPIC                                     *
 *                                                                          *
 ***************************************************************************/

export const getTopicList = () => {
  return (dispatch, getState) => {
    //      dispatch({
    //   type: GET_TOPIC_LIST,
    //   payload: "response.data"
    // });
    axios
      .get("/service/videoTopic/get", {
        params: {
          user: localStorage.user
        }
      })
      .then(response => {
        dispatch({
          type: GET_TOPIC_LIST,
          payload: response.data
        });
      })
      .catch(error => console.log(error));
  };
};

export const addTopic = topic => {
  return (dispatch, getState) => {
    axios
      .post("/service/videoTopic/add", {
        params: {
          user: localStorage.user,
          topic: topic
        }
      })
      .then(response => {
        dispatch({
          type: ADD_TOPIC,
          payload: response.data
        });
        return response;
      })
      .catch(error => console.log(error))
      .then(e => {
        if (e && e.data.message === "topicOk") {
          dispatch(getTopicList());
        }
      });
  };
};
