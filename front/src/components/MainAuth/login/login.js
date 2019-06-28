import React, { Component } from "react";
import classes from "./login.module.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import history from "../../../history";
import { loginUser } from "../../../store/actions/authentication";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      formError: false,
      loginUserError: false,
      stateErrors: []
    };
    this.resetForm = this.resetForm.bind(this);
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let error = false;
    //gestion des reg
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

    if (error) {
      this.setState({ formError: true });
      return;
    }
    this.setState({
      formError: false
    });

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };

  resetForm() {
    this.setState({
      email: "",
      password: "",
      formError: false,
      emailError: false,
      passwordError: false
    });
    this.error = false;
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      history.push("/GlobalSidebar");
      //this.setState({formError:false});
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      history.push("/");
      //this.setState({formError:false});
    }
    if (nextProps.errors) {
      this.setState({ loginUserError: true });
      this.setState({ formError: true });
      this.setState({ stateErrors: Object.values(nextProps.errors) });

      this.setState({
        errors: nextProps.errors
      });
    }
    nextProps = {};
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
              <Form size="large" inverted error>
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
                    {this.state.emailError ? (
                      <p
                        style={{
                          color: "#9f3a38",
                          textAlign: "left",
                          fontSize: "10px"
                        }}
                      >
                        Email not valid
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
                    {this.state.loginUserError ? (
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

                <Segment inverted>
                  <Form.Input
                    style={{ width: "180px" }}
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
                    error={
                      this.state.passwordError || this.state.passwordMatchError
                    }
                  />
                  <div>
                    <Button
                      onClick={this.handleSubmit}
                      content="Login"
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
