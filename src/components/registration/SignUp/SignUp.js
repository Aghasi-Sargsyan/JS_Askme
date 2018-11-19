import React, { Component } from "react";
// import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { auth } from "firebase";
import "./SignUp.scss";
import { withRouter } from "react-router-dom";
import FireManager from "../../../firebase/FireManager"
import isEmail from 'validator/lib/isEmail';
let password;

const usernameRegex = /^[a-zA-Z0-9]+$/;

const SignUpPage = ({ history }) => (
  <div>
    <SignUpForm history={history} />
  </div>
);

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      confPassword: "",
      disabled: true,
      formErrors: {
        userName: "",
        email: "",
        password: "",
        confPassword: "",
        loginError: ""
      }
    };
  }

  handleChange = e => {
    e.preventDefault();

    let formErrors = this.state.formErrors;
    const { name, value } = e.target;

    switch (name) {
      case "userName":
        formErrors.userName =
          usernameRegex.test(value) && value.length >= 3
            ? ""
            : "Minimum 3 characters required. Allowed only letters and numbers";
        break;
      case "email":
        formErrors.email = isEmail(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 characters required" : "";
        password = value;

        break;
      case "confPassword":
        formErrors.confPassword =
          password !== value
            ? "Your password and confirmation password do not match"
            : "";
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      [name]: value,
      disabled:
        formErrors.email ||
        !this.state.email ||
        (formErrors.password || !this.state.password) ||
        (formErrors.userName || !this.state.userName) ||
        (formErrors.confPassword || !this.state.confPassword)
    });
  };

  signUp = e => {
    e.preventDefault();
    const { history } = this.props;
    const {email, password, userName} = this.state;
    auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => userCredential.user)
      .then(user => {
        //adding user to DB
        FireManager.addUser({
            id: user.uid,
            userName: userName,
            email: user.email,
            gender: null,
            age:null,
            photoUrl: null,
            skills:[]
        });

        history.push("/questions");
      })
      .catch(error => {
        this.setState(prevState => ({
          formErrors: {
            ...prevState.formErrors,
            loginError: error.message
          }
        }));
        console.error(this.state.formErrors.loginError);
      });
  };

  render() {
    const { formErrors, disabled } = this.state;

    return (
      <div className="singIn">
        <form onSubmit={this.handleSubmit} className="singIn__form" noValidate>
          <div className="singIn__input__wrapper">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              name="userName"
              placeholder="First Name"
              onChange={this.handleChange}
              className={formErrors.userName.length > 0 ? "error__input" : null}
            />
            {formErrors.userName.length > 0 && (
              <span className="error__message">{formErrors.userName}</span>
            )}
          </div>
          <div className="singIn__input__wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              className={formErrors.email.length > 0 ? "error__input" : null}
            />
            {formErrors.email.length > 0 && (
              <span className="error__message">{formErrors.email}</span>
            )}
          </div>
          <div className="singIn__input__wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              className={formErrors.password.length > 0 ? "error__input" : null}
            />
            {formErrors.password.length > 0 && (
              <span className="error__message">{formErrors.password}</span>
            )}
          </div>
          <div className="singIn__input__wrapper">
            <label htmlFor="confPassword">Confirm Password</label>
            <input
              type="password"
              name="confPassword"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              className={
                formErrors.confPassword.length > 0 ? "error__input" : null
              }
            />
            {formErrors.confPassword.length > 0 && (
              <span className="error__message">{formErrors.confPassword}</span>
            )}
          </div>
          {formErrors.loginError.length > 0 && (
            <span className="error__message">{formErrors.loginError}</span>
          )}
          <button
            type="submit"
            className="singIn__submit"
            onClick={this.signUp}
            disabled={disabled}
          >
            Sign Up
          </button>
          {/* <div className='social-btn-cont'>
            <a href=''>
              <button className='social-btn social-google-btn'>
                <FaGoogle />
              </button>
            </a>
            <a href=''>
              <button className='social-btn social-fb-btn'>
                <FaFacebookF />
              </button>
            </a>
          </div> */}
        </form>
      </div>
    );
  }
}
export default withRouter(SignUpPage);

export { SignUpForm };
