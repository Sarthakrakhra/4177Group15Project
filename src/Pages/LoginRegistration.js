import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import "./../css/LoginPageCss.scss";

class LoginRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
      generalErrors: {
        username: false,
        password: false,
      },
      registrationErrors: {
        email: false,
        confirmPassword: false,
      },
      showPassword: false,
      registrationState: false,
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleUsernameChange(event) {
    const inputText = event.target.value;

    this.setState({
      username: inputText,
    });

    if (inputText.trim() === "" && inputText.length !== 0) {
      this.setState({
        generalErrors: {
          username: true,
          password: this.state.generalErrors.password,
        },
      });
    } else {
      this.setState({
        generalErrors: {
          username: false,
          password: this.state.generalErrors.password,
        },
      });
    }
  }

  handleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  handleLogin(event) {
    event.preventDefault();

    console.log(this.state.password);
    if (this.state.password.length === 0) {
      this.setState(
        {
          generalErrors: {
            ...this.state.generalErrors,
            password: true,
          },
        },
        this.checkUsernameError
      );
    } else {
      this.setState(
        {
          generalErrors: {
            ...this.state.generalErrors,
            password: false,
          },
        },
        this.checkUsernameError
      );
    }
  }

  // help for this function was taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  handleEmailChange() {}
  handleConfirmPasswordChange() {}

  checkUsernameError = () => {
    if (this.state.username.length === 0) {
      this.setState({
        generalErrors: {
          ...this.state.generalErrors,
          username: true,
        },
      });
    } else {
      this.setState({
        generalErrors: {
          ...this.state.generalErrors,
          username: false,
        },
      });
    }
  };
  render() {
    let emailRegistrationField = null;
    let confirmPasswordRegistrationField = null;

    if (this.state.registrationState) {
      emailRegistrationField = (
        <TextField
          label="Email"
          required
          name="Email"
          onChange={this.handleEmailChange}
          // error={this.state.generalErrors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      );

      confirmPasswordRegistrationField = (
        <TextField
          label="Confirm Password"
          required
          name="confirmPassword"
          onChange={this.handleConfirmPasswordChange}
          // error={this.state.generalErrors.password}
          type="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={this.handleShowPassword}
                  edge="end"
                >
                  {/* {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                            <VisibilityOff />
                          )} */}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      );
    }

    return (
      <div>
        <Container maxWidth="sm" style={{ marginTop: "1em" }}>
          <Paper>
            <Typography variant="h2" align="left">
              Login
            </Typography>
            <form className="input-group">
              <TextField
                label="Username"
                error={this.state.generalErrors.username}
                required
                name="username"
                onChange={this.handleUsernameChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              {emailRegistrationField}
              <TextField
                label="Password"
                required
                name="password"
                onChange={this.handlePasswordChange}
                error={this.state.generalErrors.password}
                type={this.state.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleShowPassword}
                        edge="end"
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              {confirmPasswordRegistrationField}
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleLogin}
              >
                <Input
                  type="submit"
                  value={this.state.registrationState ? "Register" : "Log in"}
                  style={{ color: "inherit", cursor: "pointer" }}
                  disableUnderline
                ></Input>
              </Button>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                color="primary"
                className="register-link"
                onClick={() =>
                  this.setState({
                    registrationState: !this.state.registrationState,
                  })
                }
              >
                {this.state.registrationState
                  ? "Already have an account? Click here to Log in"
                  : "Don't have an account? Register here!"}
              </Typography>
            </form>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default LoginRegistration;
