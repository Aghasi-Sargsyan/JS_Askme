import React, {Component} from "react";
import isEmail from "validator/lib/isEmail";
import {auth} from "firebase";
import paths from "../../../roteConfig/paths";
import {Link, withRouter} from "react-router-dom";


class SignInForm extends Component {
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

        const {name, value} = e.target;
        let {formErrors} = this.state;

        switch (name) {
            case "email":
                formErrors.email = isEmail(value)
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

        const {history} = this.props;
        const {email, password} = this.state;
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => userCredential.user)
            .then(user => {
                localStorage.setItem("login", "true");
                history.push(paths.questionPage)
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
        const {formErrors, disabled} = this.state;

        return (
            <div className="singIn">
                <form onSubmit={this.handleSubmit} className="singIn__form" noValidate>
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
                <p className="singIn__message">
                    Don't have an account? <Link to={paths.signUp}>Sign Up</Link>
                </p>
            </div>
        );
    }
}

export default withRouter(SignInForm)
