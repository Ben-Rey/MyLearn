import React, { Component } from "react";
import { Menu, Icon, Input, Dropdown } from "semantic-ui-react";
import classes from "./BlackMenu.module.scss";

export default class MenuExampleColoredInverted extends Component {
  componentDidMount() {}

  handleAClick = (e, { name }) => this.setState({ activeA: name });
  handleBClick = (e, { name }) => this.setState({ activeB: name });

  handleAddClick = e => {
    this.props.addButton(e);
  };

  render() {
    const TopicList = this.props.allTopic
      ? this.props.allTopic.map(topic => ({
          key: topic.topic,
          text: topic.topic,
          value: topic.topic
        }))
      : {
          key: "x",
          text: "x",
          value: "x"
        };

    return (
      <React.Fragment>
        <Menu inverted fixed="top">
          <Menu.Item>
            <Dropdown
              name={"selectTopic"}
              value={this.props.inputValue.selectTopic}
              closeOnChange
              placeholder="Select Topic"
              search
              selection
              onChange={this.props.handlerInputchange}
              options={TopicList}
              // onKeyDown={this.props.handleKeyDown}
            />
          </Menu.Item>

          <Menu.Item>
            <Input
              icon="film"
              placeholder={this.props.errorInputUrl ? "Error" : "Link"}
              value={this.props.inputValue.Url}
              name={"Url"}
              onChange={this.props.handlerInputchange}
              onKeyDown={this.props.handleKeyDown}
              error={this.props.errorInputUrl}
            />
          </Menu.Item>

          <Menu.Item>
            <Dropdown
              name={"newVideoTopic"}
              value={this.props.inputValue.videoTopic}
              closeOnChange
              multiple
              clearable
              placeholder="New Video Topic"
              search
              selection
              onChange={this.props.handlerInputchange}
              options={TopicList}
              onKeyDown={this.props.handleKeyDown}
            />
          </Menu.Item>

          <Menu.Item
            as={"div"}
            className={classes.addButton}
            onClick={this.props.addButton}
          >
            <Icon name="add" color={"green"} />
          </Menu.Item>

          <Menu.Item>
            <Input
              icon="film"
              placeholder={this.props.errorInputUrl ? "Error" : "AddTopic"}
              value={this.props.topicInputValue}
              name={"videoTopic"}
              onChange={this.props.handlerInputchange}
              onKeyDown={this.props.handleKeyDown}
              error={this.props.errorInputUrl}
            />
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}
