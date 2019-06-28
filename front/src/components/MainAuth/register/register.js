import React, { Component } from "react";
import classes from "./register.module.scss";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../../store/actions/authentication";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
      nameError: false,
      emailError: false,
      passwordError: false,
      password_confirmError: false,
      formError: false,
      registerUserError: false,
      stateErrors: [],
      successRegister: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // let successRegister = false;
    let error = false;
    //gestion des reg
    //name
    if (
      /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/i.test(
        this.state.name
      ) === false
    ) {
      this.setState({ nameError: true });
      error = true;
    } else {
      this.setState({ nameError: false });
    }
    //Mail
    if (
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email) ===
      false
    ) {
      this.setState({ emailError: true });
      error = true;
    } else {
      this.setState({ emailError: false });
    }

    //Password
    if (/^[a-zA-Z]\w{3,14}$/i.test(this.state.password) === false) {
      this.setState({ passwordError: true });
      error = true;
    } else {
      this.setState({ passwordError: false });
    }

    //Password
    if (
      /^[a-zA-Z]\w{3,14}$/i.test(this.state.password_confirm) === false ||
      this.state.password_confirm !== this.state.password
    ) {
      this.setState({ password_confirmError: true });
      error = true;
    } else {
      this.setState({ password_confirmError: false });
    }

    if (error) {
      this.setState({ formError: true });
      return;
    }
    this.setState({
      formError: false
    });

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    if ({ registerUserError: false }) {
      this.props.registerUser(user, this.props.history);
      this.setState({
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        formError: false,
        nameError: false,
        emailError: false,
        passwordError: false,
        password_confirmError: false,
        successRegister: true
      });
      this.setState({
        formError: false
      });
      error = false;
      //successRegister=true;
    }
  }
  resetForm() {
    this.setState({
      name: "",
      email: "",
      password: "",
      password_confirm: "",
      formError: false,
      nameError: false,
      emailError: false,
      passwordError: false,
      password_confirmError: false,
      successRegister: false
    });
    this.error = false;
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.errors).length === 0) {
      this.setState({ formError: false });
      this.setState({ successRegister: true });
    } else {
      this.setState({ registerUserError: true });
      this.setState({ successRegister: false });
      this.setState({ formError: true });
      this.setState({ stateErrors: Object.values(nextProps.errors) });
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    return (
      <div className={classes.login}>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column className={classes.gridColumn}>
            <Segment inverted>
              <Form size="large" inverted error success>
                {this.state.formError ? (
                  <Message
                    negative
                    style={{ width: "180px", marginLeft: "14px" }}
                  >
                    <Message.Header
                      style={{ color: "#9f3a38", textAlign: "left" }}
                    >
                      Error
                    </Message.Header>
                    {this.state.nameError ? (
                      <p
                        style={{
                          color: "#9f3a38",
                          textAlign: "left",
                          fontSize: "10px"
                        }}
                      >
                        Name not valid
                      </p>
                    ) : null}
                    {this.state.emailError ? (
                      <p
                        style={{
                          color: "#9f3a38",
                          textAlign: "left",
                          fontSize: "10px"
                        }}
                      >
                        Mail not valid
                      </p>
                    ) : null}
                    {this.state.passwordError ? (
                      <p
                        style={{
                          color: "#9f3a38",
                          textAlign: "left",
                          fontSize: "10px"
                        }}
                      >
                        Password not valid
                      </p>
                    ) : null}
                    {this.state.password_confirmError ? (
                      <p
                        style={{
                          color: "#9f3a38",
                          textAlign: "left",
                          fontSize: "10px"
                        }}
                      >
                        Password confirm not valid
                      </p>
                    ) : null}
                    {this.state.registerUserError ? (
                      <p
                        style={{
                          color: "#9f3a38",
                          textAlign: "left",
                          fontSize: "10px"
                        }}
                      >
                        {this.state.stateErrors}
                      </p>
                    ) : null}
                  </Message>
                ) : null}

                {this.state.successRegister ? (
                  <Message
                    success
                    style={{ width: "180px", marginLeft: "14px" }}
                  >
                    <Message.Header
                      style={{ color: "#2c662d", textAlign: "left" }}
                    >
                      Success
                    </Message.Header>
                    <p
                      style={{
                        color: "#2c662d",
                        textAlign: "left",
                        fontSize: "10px"
                      }}
                    >
                      You have registered successfully
                    </p>
                  </Message>
                ) : null}
                {/* <Message success style={{ width: "180px",marginLeft:"14px" }}>
                   <Message.Header  style={{color:"#9f3a38",textAlign:"left"}}>Success</Message.Header> */}

                <Segment inverted>
                  <Form.Input
                    style={{ width: "180px" }}
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    error={this.state.nameError}
                  />
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    error={this.state.emailError}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    error={this.state.passwordError}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm Password"
                    type="password"
                    name="password_confirm"
                    value={this.state.password_confirm}
                    onChange={this.handleInputChange}
                    error={this.state.password_confirmError}
                  />

                  <div>
                    <Button
                      onClick={this.handleSubmit}
                      content="Register"
                      color="grey"
                    />
                    <Button
                      onClick={this.resetForm}
                      content="Reset"
                      color="red"
                    />
                  </div>
                </Segment>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
