import React, { Component } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import {auth} from "firebase";
import { Link } from "react-router-dom";
import "./SignIn.scss";

const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      disabled: true,
      formErrors: {
        email: "",
        password: "",
        loginError: ""
      }
    };
  }

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let { formErrors } = this.state;

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 characters required" : "";
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
        (formErrors.password || !this.state.password)
    });
  };

  login = e => {
    e.preventDefault();

    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        this.setState(prevState => ({
          formErrors: {
            ...prevState.formErrors,
            loginError: error.message
          }
        }));
        console.log(this.state.formErrors.loginError);
      });
  };

  render() {
    const { formErrors, disabled } = this.state;

    return (
      <div className="singIn">
        <form onSubmit={this.handleSubmit} className="singIn__form" noValidate>
          <div className="singIn__input__wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              noValidate
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
              noValidate
              onChange={this.handleChange}
              className={formErrors.password.length > 0 ? "error__input" : null}
            />
            {formErrors.password.length > 0 && (
              <span className="error__message">{formErrors.password}</span>
            )}
          </div>
          {formErrors.loginError.length > 0 && (
            <span className="error__message">{formErrors.loginError}</span>
          )}
          <button
            type="submit"
            onClick={this.login}
            className="singIn__submit"
            disabled={disabled}
          >
            Sign In
          </button>
          <p className="singIn__message">
            Not registered? <Link to="/signUp">Create an account</Link>
          </p>
          {/* <div className='social-btn-cont'>
            <a href=''>
              <button onClick={this.loginWithGoogle} className='social-btn social-google-btn'>
                <FaGoogle />
              </button>
            </a>
            <a href=''>
              <button onClick={this.loginWithFb} className='social-btn social-fb-btn'>
                <FaFacebookF />
              </button>
            </a>
          </div> */}
        </form>
      </div>
    );
  }
}
