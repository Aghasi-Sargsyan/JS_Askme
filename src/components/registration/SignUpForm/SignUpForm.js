import React, {Component} from "react";
import {auth} from "firebase";
import "./SignUpForm.scss";
import FireManager from "../../../firebase/FireManager"
import isEmail from 'validator/lib/isEmail';
import {Link} from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";
import {bindActionCreators} from "redux";
import {actionAddUserData} from "../../../redux/actions/userActions";
import connect from "react-redux/es/connect/connect";
import fb from "../../../assets/icons/fb.png";
import google from "../../../assets/icons/google.png";
import twitter from "../../../assets/icons/twitter.png";


let password;

const usernameRegex = /^[a-zA-Z0-9]+$/;

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
        const {name, value} = e.target;

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
        const {email, password, userName} = this.state;
        auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                return userCredential.user
            })
            .then(user => {
                const newUser = {
                    id: user.uid,
                    userName: userName,
                    email: user.email,
                    gender: "",
                    age: 0,
                    photoUrl: "",
                    skills: [],
                    isNewUser: true
                };
                //adding user to DB
                FireManager.addUser(newUser);
                this.props.dispatchUser(newUser)
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
            <div className="singInUp flex">
                <div className='signUp__left'>
                    <div className='signUp__logo'>
                        <p className='font_m'><span className='logo_letter'>A</span>sk<span
                            className='logo_letter'>M</span>e</p>
                    </div>
                    <p className='signUp__quotes font_l'>Find out the answers to your questions</p>
                    <Link to={routePaths.signIn}>Sign In</Link>
                </div>
                <div className='signUp__right'>
                    <div className='signUp__with tac'>
                        <p className='font_m'>Sign In With</p>
                        <div className='social_btns'>
                            <button onClick={this.loginWithGoogle} className='social_btn'>
                                <img src={google} alt="google"/>
                            </button>
                            <button onClick={this.loginWithFb} className='social_btn social_btn_fb'>
                                <img src={fb} alt="fb"/>
                            </button>
                            <button onClick={this.loginWithFb} className='social_btn'>
                                <img src={twitter} alt="twitter"/>
                            </button>
                        </div>

                    </div>
                    <form onSubmit={this.handleSubmit} className="singUn__form tac" noValidate>
                        <div className="singInUp__input__wrapper">
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
                        <div className="singInUp__input__wrapper">
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
                            className="singInUp__submit"
                            onClick={this.signUp}
                            disabled={disabled}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUser: bindActionCreators(actionAddUserData, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(SignUpForm);