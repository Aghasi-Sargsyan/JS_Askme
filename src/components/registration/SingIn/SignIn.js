import React, { Component } from "react";
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

const usernameRegex = /^[a-zA-Z0-9]+$/;

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

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      password: null,
      formErrors: {
        userName: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        --SUBMITING--
        UserName Nsme: ${this.state.userName}
        Password Nsme: ${this.state.password}
        `);
    } else {
      console.log("Form INVALID - Display Error Message");
    }
  };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "userName":
        formErrors.userName = usernameRegex.test(value) && value.length >= 3
          ? ""
          : "Minimum 3 characters required. Allowed only letters and numbers";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 characters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
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
              placeholder="User Name"
              noValidate
              onChange={this.handleChange}
              className={formErrors.userName.length > 0 ? "error__input" : null}
            />
            {formErrors.userName.length > 0 && (
              <span className="error__message">{formErrors.userName}</span>
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

          <button type="submit" className="singIn__submit">
            Sign In
          </button>
          <p className="singIn__message">
            Not registered? <a href="#">Create an account</a>
          </p>
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
