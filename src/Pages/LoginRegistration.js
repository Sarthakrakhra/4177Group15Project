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
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import "./../css/LoginPageCss.scss";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";

const initialState = {
  username: "",
  password: "",
  email: "",
  confirmPassword: "",
  userRole: "",
  generalErrors: {
    username: false,
    password: false,
  },
  registrationErrors: {
    email: false,
    confirmPassword: false,
    userRole: false,
  },
  showPassword: false,
  registrationState: false,
  dialogOpen: false,
  dialogText: "",
  invalidCredentials: false,
  disableAuthButton: false,
};

class LoginRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.changeForm = this.changeForm.bind(this);
    this.handleUserRoleCange = this.handleUserRoleCange.bind(this);
  }

  handlePasswordChange(event) {
    const passwordInput = event.target.value;

    this.setState({
      password: passwordInput,
    });

    if (passwordInput.length !== 0) {
      this.setState({
        generalErrors: {
          ...this.state.generalErrors,
          password: false,
        },
      });
    } else {
      this.setState({
        generalErrors: {
          ...this.state.generalErrors,
          password: true,
        },
      });
    }
  }

  handleUsernameChange(event) {
    const inputText = event.target.value;

    this.setState({
      username: inputText,
    });

    if (inputText.trim() === "" && inputText.length !== 0) {
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
  }

  handleUserRoleCange(event) {
    const selection = event.target.value;
    this.setState(
      {
        userRole: selection,
      },
      () => this.checkUserRoleError()
    );
  }

  async checkUserRoleError() {
    if (!this.state.userRole) {
      this.setState({
        registrationErrors: {
          ...this.state.registrationErrors,
          userRole: true,
        },
      });
    } else {
      this.setState({
        registrationErrors: {
          ...this.state.registrationErrors,
          userRole: false,
        },
      });
    }
  }

  handleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  async handleAuthentication(event) {
    event.preventDefault();

    this.setState({ disableAuthButton: true });
    await this.checkPasswordError();

    if (this.state.registrationState) {
      if (this.state.email.length === 0)
        await this.validateEmail(this.state.email);

      if (this.state.confirmPassword.length === 0)
        await this.validateConfirmPassword(this.state.confirmPassword);

      if (!this.state.userRole) await this.checkUserRoleError();
    }

    if (await this.checkAllErrors()) {
      if (!this.state.registrationState) {
        axios
          .post("https://a4-4177-g15.herokuapp.com/user/login", {
            username: this.state.username,
            password: this.state.password,
          })
          .then((response) => {
            if (response.data.loggedIn) {
              this.setState({
                dialogOpen: true,
                dialogText: `Welcome ${this.state.username}. You are now logged in!`,
                invalidCredentials: false,
                disableAuthButton: false,
              });
              sessionStorage.setItem(
                "user",
                JSON.stringify({ username: this.state.username })
              );
              sessionStorage.setItem(
                "cookie",
                response.data.cookie
              );
            }
          })
          .catch((error) => {
            this.setState({
              dialogOpen: true,
              dialogText: "Invalid credentials. Please try again!",
              invalidCredentials: true,
              disableAuthButton: false,
            });
          });
      } else {
        axios
          .post("https://a4-4177-g15.herokuapp.com/user/register", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            info: `Hi I'm ${this.state.username}`,
          })
          .then((result) => {
            this.setState({
              dialogOpen: true,
              dialogText: `Welcome ${this.state.username}. You are now registered and logged in!`,
              invalidCredentials: false,
              disableAuthButton: false,
            });
            sessionStorage.setItem(
              "user",
              JSON.stringify({ username: this.state.username })
            );
            sessionStorage.setItem(
              "cookie",
              result.data.cookie
            );
          })
          .catch((error) => {
            const tempErrorMsg = error.response.data.message;
            let dialogErrorMessage = "";
            if (tempErrorMsg.includes("duplicate")) {
              dialogErrorMessage =
                "Please make sure your username and email are not already registered";
            } else {
              dialogErrorMessage = tempErrorMsg;
            }
            this.setState({
              dialogOpen: true,
              dialogText: dialogErrorMessage,
              invalidCredentials: true,
              disableAuthButton: false,
            });
          });
      }
    }
    this.setState({ disableAuthButton: false });
  }

  async checkPasswordError() {
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

  async checkAllErrors() {
    for (const error in this.state.generalErrors) {
      if (this.state.generalErrors[error]) return false;
    }

    if (this.state.registrationState) {
      for (const error in this.state.registrationErrors) {
        if (this.state.registrationErrors[error]) return false;
      }
    }

    return true;
  }

  // help for this function was taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  handleEmailChange(event) {
    const inputValue = event.target.value;
    this.setState(
      {
        email: inputValue,
      },
      () => this.validateEmail(inputValue)
    );
  }

  async validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(String(email).toLowerCase());
    if (!valid) {
      this.setState({
        registrationErrors: {
          ...this.state.registrationErrors,
          email: true,
        },
      });
    } else {
      this.setState({
        registrationErrors: {
          ...this.state.registrationErrors,
          email: false,
        },
      });
    }
  }

  handleConfirmPasswordChange(event) {
    const inputValue = event.target.value;
    this.setState(
      {
        confirmPassword: inputValue,
      },
      () => this.validateConfirmPassword(inputValue)
    );
  }

  async validateConfirmPassword(confirmPasswordInput) {
    if (
      confirmPasswordInput !== this.state.password ||
      confirmPasswordInput.length === 0
    ) {
      this.setState({
        registrationErrors: {
          ...this.state.registrationErrors,
          confirmPassword: true,
        },
      });
    } else {
      this.setState({
        registrationErrors: {
          ...this.state.registrationErrors,
          confirmPassword: false,
        },
      });
    }
  }

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

  changeForm = (prevRegistrationState) => {
    console.log(prevRegistrationState);
    this.setState(initialState, () =>
      this.setState({
        registrationState: !prevRegistrationState,
      })
    );
  };

  render() {
    let emailRegistrationField = null;
    let confirmPasswordRegistrationField = null;
    let confirmPasswordIcon = null;
    let userRoleSelection = null;

    if (this.state.registrationState) {
      emailRegistrationField = (
        <TextField
          label="Email"
          required
          name="Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          error={this.state.registrationErrors.email}
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

      confirmPasswordIcon = this.state.registrationErrors.confirmPassword ? (
        <ClearIcon />
      ) : (
        <CheckIcon />
      );
      confirmPasswordRegistrationField = (
        <TextField
          label="Confirm Password"
          required
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleConfirmPasswordChange}
          error={this.state.registrationErrors.confirmPassword}
          type="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {confirmPasswordIcon}
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      );

      userRoleSelection = (
        <FormControl
          variant="outlined"
          error={this.state.registrationErrors.userRole}
        >
          <InputLabel>User role</InputLabel>
          <Select
            labelId="selectUserRole"
            value={this.state.userRole}
            onChange={this.handleUserRoleCange}
            label="Age"
          >
            <MenuItem value="Professor">Professor</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </Select>
        </FormControl>
      );
    }

    return (
      <div>
        <Dialog
          open={this.state.dialogOpen}
          aria-describedby="alert-dialog-redirect-to-home"
        >
          <DialogContent>
            <DialogContentText>{this.state.dialogText}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {this.state.invalidCredentials ? (
              <Button onClick={() => this.setState({ dialogOpen: false })}>
                Close
              </Button>
            ) : (
              <Link to="/">
                <Button color="primary" autoFocus>
                  Back to home page
                </Button>
              </Link>
            )}
          </DialogActions>
        </Dialog>
        <Container maxWidth="sm" style={{ marginTop: "1em" }}>
          <Paper>
            <Typography variant="h2" align="left">
              {this.state.registrationState ? "Register " : "Login"}
            </Typography>
            <form className="input-group">
              <TextField
                label="Username"
                error={this.state.generalErrors.username}
                value={this.state.username}
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
              {userRoleSelection}
              <TextField
                label="Password"
                required
                value={this.state.password}
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
                onClick={this.handleAuthentication}
                disabled={this.state.disableAuthButton}
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
                onClick={() => this.changeForm(this.state.registrationState)}
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
