import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authentication";
import { withRouter } from "react-router";

import style from "./Home.module.scss";

import { Button, Menu, Popup } from "semantic-ui-react";
// import MainAuth from "../../components/MainAuth/mainAuth.js"
import Authentication from "../../components/Authentication/Authentication";

import video from "../../assets/video/homeVideo.mp4";
import video2 from "../../assets/video/homeVideo.webm";
import logo from "../../assets/Logo/Logo.svg";

class Home extends Component {
  state = {};
  toggle = () => this.setState(prevState => ({ open: !prevState.open }));
  handleLogOut = () => {
    this.props.logoutUser();
  };

  render() {
    const popUpStyle = {
      // borderRadius: 0,
      opacity: 0.9,
      marginRight: "10px"
    };

    return (
      <div>
        <Menu inverted className={style.menu}>
          <Menu.Item>
            <img src={logo} alt="NoLOGO" />
          </Menu.Item>
          <Menu.Item className={style.title} position="left">
            MyLearnTool
          </Menu.Item>

          <Menu.Menu position="right">
            <Popup
              wide
              trigger={
                <Menu.Item link className={style.title} onClick={this.toggle}>
                  Login
                </Menu.Item>
              }
              on="click"
              position="bottom right"
              style={popUpStyle}
              inverted
              open={this.state.open}
            >
              <Authentication />
            </Popup>
            <Menu.Item
              link
              className={style.title}
              position="right"
              onClick={this.handleLogOut}
            >
              LogOut
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <div className={style.video}>
          <Button
            className={style.btn}
            size="massive"
            href={"/GlobalSidebar"}
            inverted
            disabled={!this.props.auth.isAuthenticated}
          >
            ENTRER
          </Button>

          <div className={style.videoContainer}>
            <video
              className={style.backgroundVideo}
              resizemode="cover"
              loop
              autoPlay
              muted
            >
              <source src={video} type="video/mp4" />
              <source src={video2} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Home));
