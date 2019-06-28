import React, { Component } from "react";

class layout extends Component {
  state = {};

  render() {
    return (
      <div>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default layout;
