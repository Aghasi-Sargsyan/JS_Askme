import React, { Component } from "react";
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

let password,
  confPassword;

const usernameRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // validate form errors being empty
  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      confPassword: '',
      formErrors: {
        userName: "",
        email: "",
        password: "",
        confPassword: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITING--
        User Name: ${this.state.userName}
        Email Nasme: ${this.state.email}
        Password Name: ${this.state.password}
        Confirm Password Name: ${this.state.confPassword}
        `);
    } else {
      console.log("Form INVALID - Display Error Message");
    }
  };

  handleChange = e => {
    e.preventDefault();

    let formErrors = this.state.formErrors;
    const { name, value } = e.target;

    switch (name) {
      case "userName":
        formErrors.userName = usernameRegex.test(value) && value.length >= 3
          ? ""
          : "Minimum 3 characters required. Allowed only letters and numbers";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
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
          password !== value ? "Your password and confirmation password do not match" : "";
        confPassword = value;
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="singIn">
        <form onSubmit={this.handleSubmit} className="singIn__form" noValidate>
          <div className="singIn__input__wrapper">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              name="userName"
              placeholder="First Name"
              noValidate
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
          <div className="singIn__input__wrapper">
            <label htmlFor="confPassword">Confirm Password</label>
            <input
              type="password"
              name="confPassword"
              placeholder="Confirm Password"
              noValidate
              onChange={this.handleChange}
              className={formErrors.confPassword.length > 0 ? "error__input" : null}
            />
            {formErrors.confPassword.length > 0 && (
              <span className="error__message">{formErrors.confPassword}</span>
            )}
          </div>
          <button type="submit" className="singIn__submit">
            Sign Up
          </button>
          <div className='social-btn-cont'>
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
          </div>
        </form>
      </div>
    );
  }
}
