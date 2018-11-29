import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "firebase";
import routePaths from "../../../constKeys/routePaths";
import isEmail from "validator/lib/isEmail";
import fb from "../../../assets/icons/fb.png";
import google from "../../../assets/icons/google.png";
import twitter from "../../../assets/icons/twitter.png";
import './SignInForm.scss'

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

        const { name, value } = e.target;
        let { formErrors } = this.state;

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

        const { history } = this.props;
        const { email, password } = this.state;
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
              history.push(routePaths.questionPage)
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
            <div className="singInUp am__flex">
                <div className='signIn__left'>
                    <div className='signIn__logo'>
                        <p className='am_font_m'>AskMe</p>
                    </div>
                    <div className='signIn__with am__tac'>
                        <p className='am_font_m'>Sign In With</p>
                        <div className='social_btns'>
                            <button onClick={this.loginWithGoogle} className='social_btn'>
                                <img src={google} alt="google" />
                            </button>
                            <button onClick={this.loginWithFb} className='social_btn social_btn_fb'>
                                <img src={fb} alt="fb" />
                            </button>
                            <button onClick={this.loginWithFb} className='social_btn'>
                                <img src={twitter} alt="twitter" />
                            </button>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit} className="singIn__form am__tac" noValidate>
                        <div className="singInUp__input__wrapper">
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
                        <div className="singInUp__input__wrapper">
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
                            className="singInUp__submit"
                            disabled={disabled}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
                <div className='signIn__right am__center'>
                    <p className='am_font_l'>Let's Go!</p>
                    <Link to={routePaths.signUp}>Sign Up</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(SignInForm)