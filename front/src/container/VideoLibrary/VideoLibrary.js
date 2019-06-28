import React, { Component } from "react";
import classes from "./VideoLibrary.module.scss";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

//Redux
import * as actionCreators from "../../store/actions/video";
import { connect } from "react-redux";

import ReactPlayer from "react-player";
import Menu from "../../components/ui/Menu/BlackMenu";
import Modale from "../../components/Modal/Modals";
import VideoCard from "../../components/VideoCard/VideoCard";
import CustomContext from "../../components/CustomContext/CustomContext";
import { Card, Segment, Transition, Dimmer, Loader } from "semantic-ui-react";
import withSizes from "react-sizes";

class VideoLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "grey",
      CardsVisibility: false,
      openModal: false,
      componentDidMout: false,
      currentUrl: null,
      newTopic: "",
      topicSelected: "all",
      newVideo: {
        Url: "",
        title: "",
        urlPhoto: "",
        videoTopic: []
      },
      errorInputUrl: false,
      cardRightClicked: "",
      contextualMenu: {
        contexMenuVisible: false,
        position: {
          X: "",
          Y: ""
        },
        Items: [{ label: "TOPIC" }, { label: "DELETE" }]
      }
    };
  }

  componentDidMount() {
    if (!this.props.allVideos.length) {
      this.props.getAllVideo();
      this.props.getTopicList();
    }
    this.setState({ componentDidMout: true });

    setTimeout(() => {
      this.setState(prevState => ({
        CardsVisibility: !prevState.CardsVisibility
      }));
    }, 300);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.allVideos);

    if (this.props.messageFromBack !== prevProps.messageFromBack) {
      switch (this.props.messageFromBack.message) {
        case "VideoNotOk":
          this.resetVideoState();
          NotificationManager.error(
            "Url Error",
            "L'url de la video n'est pas valide",
            3000
          );
          break;
        case "VideoExist":
          this.resetVideoState();

          NotificationManager.warning(
            "Url Error",
            "La video a deja été enregistré",
            3000
          );
          break;
        case "VideoOk":
          this.resetVideoState();

          NotificationManager.success(
            "La video a bien été enregistré",
            "Success",
            3000
          );
          break;
        default:
          break;
      }
    }
  }

  resetVideoState = () => {
    this.setState({
      newVideo: {
        Url: "",
        title: "",
        urlPhoto: "",
        videoTopic: []
      }
    });
  };

  handlerInputchange = (event, data) => {
    switch (data.name) {
      case "Url":
        const newUrl = this.state.newVideo;
        newUrl[data.name] = data.value;
        this.setState({ newVideo: newUrl });
        break;
      case "videoTopic":
        this.setState({ newTopic: data.value });
        break;
      case "newVideoTopic":
        const newVideoTopic = this.state.newVideo;
        newVideoTopic.videoTopic = data.value;
        this.setState({ newVideo: newVideoTopic });
        break;
      case "selectTopic":
        this.setState({ topicSelected: data.value });
        break;
      default:
        break;
    }
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      switch (event.target.name) {
        case "Url":
          this.addVideo(this.state.newVideo);
          break;
        case "videoTopic":
          break;
        default:
          break;
      }
    } else {
      if (this.state.errorInputUrl) {
        this.setState({ errorInputUrl: false });
      }
    }
  };

  handleClickOnlist = url => {
    this.setState({
      currentUrl: url
    });
    this.handleModalVisibility(true);
    window.scrollTo(0, 0);
  };

  handleRightClickOnCard = (e, videoId) => {
    e.preventDefault();
    const menu = this.state.contextualMenu;
    menu.contexMenuVisible = !menu.contexMenuVisible;
    menu.position = { X: e.clientX, Y: e.clientY };

    this.setState({ contextualMenu: menu });
    if (videoId) {
      this.setState({ cardRightClicked: videoId });
    }
  };

  contextMenuItemClicked = action => {
    switch (action) {
      case "DELETE":
        this.props.deleteVideo(this.state.cardRightClicked);
        break;
      case "TOPIC":
        break;
      default:
        break;
    }
  };

  handleModalVisibility = visibility => {
    this.setState({
      openModal: visibility
    });
  };

  addVideo = newVideo => {
    if (newVideo.Url.length > 0) {
      this.props.addVideo(newVideo);
    } else if (this.state.newTopic) {
      this.props.addTopic(this.state.newTopic);
      this.setState({ newTopic: "" });
    } else {
      this.setState({ errorInputUrl: true });
    }
  };

  render() {
    // const backgroundColor = this.state.backgroundColor;

    // Peut etre faire un composent pour alleger ce fichier
    const videoList =
      this.props.allVideos.length > 0 ? (
        <Transition
          visible={this.state.CardsVisibility}
          animation="scale"
          duration={1000}
        >
          <Segment basic style={{ marginTop: "65px", height: "100%" }}>
            <Card.Group itemsPerRow={this.props.numberOfCard}>
              {this.props.allVideos.map((video, index) => {
                if (video.topic.includes(this.state.topicSelected)) {
                  return (
                    <VideoCard
                      className={classes.videoCard}
                      key={index}
                      index={index}
                      video={video}
                      handleImageClick={this.handleClickOnlist}
                      handleRightClick={this.handleRightClickOnCard}
                    />
                  );
                } else {
                  return "";
                }
              })}
            </Card.Group>
          </Segment>
        </Transition>
      ) : (
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      );

    return (
      // <div className={classes.layout} style={{backgroundColor:backgroundColor}}>
      <div
        className={classes.layout}
        style={{
          overflow: this.state.contextualMenu.contexMenuVisible
            ? "hidden"
            : "auto"
        }}
      >
        <NotificationContainer />
        <Menu
          handlerInputchange={this.handlerInputchange}
          addButton={() => this.addVideo(this.state.newVideo)}
          inputValue={this.state.newVideo}
          topicInputValue={this.state.newTopic}
          handleKeyDown={this.handleKeyDown}
          errorInputUrl={this.state.errorInputUrl}
          allTopic={this.props.allTopic}
        />

        <Modale
          open={this.state.openModal}
          handleModalVisibility={this.handleModalVisibility}
        >
          <ReactPlayer
            className={classes.reactPlayer}
            url={this.state.currentUrl}
            playing
            width="100%"
            height={this.props.VideoHeight}
            controls={true}
            light={true}
          />
        </Modale>

        {videoList}

        <CustomContext
          items={this.state.contextualMenu.Items}
          visible={this.state.contextualMenu.contexMenuVisible}
          position={this.state.contextualMenu.position}
          hideContext={this.handleRightClickOnCard}
          itemClick={this.contextMenuItemClicked}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allVideos: state.video.allVideo,
    allTopic: state.video.allTopic,
    messageFromBack: state.video.messageFromBack
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllVideo: () => dispatch(actionCreators.getAllVideo()),
    addVideo: newVideo => dispatch(actionCreators.addVideo(newVideo)),
    deleteVideo: id => dispatch(actionCreators.deleteVideo(id)),
    getTopicList: () => dispatch(actionCreators.getTopicList()),
    addTopic: newTopic => dispatch(actionCreators.addTopic(newTopic))
  };
};

const mapSizesToProps = ({ width }) => ({
  numberOfCard:
    width < 376 ? 1 : width < 426 ? 1 : width < 769 ? 3 : width < 1025 ? 4 : 5,
  VideoHeight:
    width < 376
      ? "250px"
      : width < 426
      ? "260px"
      : width < 769
      ? "400px"
      : width < 1025
      ? "450px"
      : "480px"
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSizes(mapSizesToProps)(VideoLibrary));
