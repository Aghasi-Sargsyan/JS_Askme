import React, { Component } from "react";
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import fire from '../../../config/Fire';
import { Link } from "react-router-dom";

// const usernameRegex = /^[a-zA-Z0-9]+$/;
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

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: "",
        password: "",
        loginError: '',
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

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  login = (e) => {
    e.preventDefault();

    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((error) => {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          loginError: error.message
        }
      }))
      console.log(this.state.formErrors.loginError);
    });
  }

  render() {
    const { formErrors } = this.state;
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
          >
            Sign In
          </button>
          <p className="singIn__message">
            Not registered? <Link to='/signUp'>Create an account</Link>

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