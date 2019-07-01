import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
// import classes from "./Authentication.module.scss";
import Login from "./Login/Login";
import Register from "./Register/Register";

class Authentication extends Component {
  render() {
    const panes = [
      {
        menuItem: "LOGIN",
        render: () => (
          <Tab.Pane attached={false}>
            <Login />
          </Tab.Pane>
        )
      },
      {
        menuItem: "REGISTER",
        render: () => (
          <Tab.Pane attached={false}>
            <Register />
          </Tab.Pane>
        )
      }
    ];

    return (
      <div>
        <Tab
          style={{ color: "green" }}
          menu={{ secondary: true, pointing: true, inverted: true }}
          panes={panes}
        />
      </div>
    );
  }
}

export default Authentication;
