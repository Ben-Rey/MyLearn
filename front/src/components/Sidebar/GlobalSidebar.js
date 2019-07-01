import React, { Component } from "react";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Route, Link } from "react-router-dom";

import Avatar from "../Avatar/Avatar";

import DashBoard from "../../container/DashBoard/DashBoard";
import VideoManager from "../../container/VideoLibrary/VideoLibrary";
import PhotosManager from "../../container/PhotosManager/PhotoManager";
import Memo from "../../container/Memo/Memo";
import Tests from "../../container/Tests/Tests";

export default class GlobalSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, activeItem: "VideoManager" };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSidebarHide = () => this.setState({ visible: false });

  _onMouseMove = e => {
    if (e.pageX < 5) {
      this.setState({ visible: true });
    }
  };

  _onMouseLeave = e => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const { activeItem } = this.state;

    const elements = [
      { name: "DashBoard", icon: "dashboard", component: DashBoard },
      { name: "VideoManager", icon: "video play", component: VideoManager },
      { name: "Memo", icon: "cloud", component: Memo },
      { name: "PhotosManager", icon: "photo", component: PhotosManager },
      { name: "Tests", icon: "flag checkered", component: Tests }
    ];

    const style = {
      segmentStyle: {
        padding: "0"
      }
    };

    const Links = elements.map((element, index) => (
      <Link
        key={index}
        to={`${this.props.match.url}/${element.name}`}
        style={{ textDecoration: "none" }}
      >
        <Menu.Item
          as="div"
          name={element.name}
          active={activeItem === element.name}
          onClick={this.handleItemClick}
        >
          <Icon name={element.icon} />
          {element.name}
        </Menu.Item>
      </Link>
    ));

    const Routes = elements.map((element, index) => (
      <Route
        key={index}
        path={`${this.props.match.path}/${element.name}`}
        component={element.component}
      />
    ));

    return (
      <div>
        <Sidebar.Pushable as={Segment} onMouseMove={this._onMouseMove}>
          <Sidebar
            as={Menu}
            animation="scale down"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="thin"
            onMouseLeave={this._onMouseLeave}
          >
            <Menu.Item>
              <Avatar />
            </Menu.Item>

            {Links}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic style={style.segmentStyle}>
              <Route
                exact
                path={this.props.match.path}
                component={VideoManager}
              />

              {Routes}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
