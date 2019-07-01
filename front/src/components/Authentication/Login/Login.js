import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../store/actions/authentication";
import history from "../../../history";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      errorFromBack: null,
      formError: false,
      formSuccess: false,
      loginUserError: false,
      stateErrors: []
    };
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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      history.push("/GlobalSidebar");
      this.setState({ formError: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      history.push("/");
      this.setState({ formSuccess: true });
    }
    if (Object.values(nextProps.errors).length > 0) {
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
    const styleP = { color: "#9f3a38", textAlign: "left", fontSize: "10px" };
    const messageError = this.state.formError ? (
      <Message negative style={{ width: "180px", marginLeft: "14px" }}>
        <Message.Header style={{ color: "#9f3a38", textAlign: "left" }}>
          Error
        </Message.Header>
        {this.state.emailError ? <p style={styleP}>Email not valid</p> : null}
        {this.state.passwordError ? (
          <p style={styleP}>Password not valid</p>
        ) : null}
        {this.state.loginUserError ? (
          <p style={styleP}>{this.state.stateErrors}</p>
        ) : null}
      </Message>
    ) : null;

    const messageSuccess = this.state.formSuccess ? (
      <Message success>
        <Message.Header style={{ color: "green", textAlign: "left" }}>
          Success
        </Message.Header>
      </Message>
    ) : null;

    return (
      <div>
        <Form error success>
          <Form.Input
            iconPosition="left"
            icon="user secret"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            error={this.state.emailError}
          />
          <Form.Input
            iconPosition="left"
            icon="key"
            name="password"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            error={this.state.passwordError || this.state.passwordMatchError}
          />
          <Button onClick={this.handleSubmit}>Submit</Button>
          {messageError}
          {messageSuccess}
        </Form>
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
