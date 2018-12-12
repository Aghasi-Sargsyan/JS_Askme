import React, { Component } from "react";
import { auth } from "firebase";
import "./SignUpForm.scss";
import FireManager from "../../../firebase/FireManager"
import isEmail from 'validator/lib/isEmail';
import { Link } from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";
import { bindActionCreators } from "redux";
import { actionAddUserData } from "../../../redux/actions/userActions";
import connect from "react-redux/es/connect/connect";
import fb from "../../../assets/icons/fb.png";
import google from "../../../assets/icons/google.png";
import twitter from "../../../assets/icons/twitter.png";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        height: '100vh',
        position: 'relative',
    },
    paper: {
        width: '500px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 24px 60px 24px',
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    blue: {
        backgroundColor: '#04a9f5',
        color: '#fff'
    }
});

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
        const { email, password, userName } = this.state;
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
        const { formErrors, disabled } = this.state;
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    {/* <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-userName-input"
                                label="Username"
                                className={formErrors.userName.length > 0 ? "error__input" : null}
                                onChange={this.handleChange}
                                type="text"
                                name="userName"
                                autoComplete="userName"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.userName.length > 0 && (
                                <span className="error__message">{formErrors.userName}</span>
                            )}
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                className={formErrors.email.length > 0 ? "error__input" : null}
                                onChange={this.handleChange}
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.email.length > 0 && (
                                <span className="error__message">{formErrors.email}</span>
                            )}
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                className={formErrors.password.length > 0 ? "error__input" : null}
                                onChange={this.handleChange}
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.password.length > 0 && (
                                <span className="error__message">{formErrors.password}</span>
                            )}
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-confPassword-input"
                                label="Confirm Password"
                                className={formErrors.confPassword.length > 0 ? "error__input" : null}
                                onChange={this.handleChange}
                                type="password"
                                name="confPassword"
                                autoComplete="confirm-password"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.confPassword.length > 0 && (
                                <span className="error__message">{formErrors.confPassword}</span>
                            )}
                        </FormControl>

                        {formErrors.loginError.length > 0 && (
                            <span className="error__message">{formErrors.loginError}</span>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={`${classes.submit} ${classes.blue}`}
                            onClick={this.signUp}
                            disabled={!!disabled}

                        >
                            Sign up
                        </Button>
                        <Link to={routePaths.signIn}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Sign in
                        </Button>
                        </Link>
                    </form>
                </Paper>
            </main >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchUser: bindActionCreators(actionAddUserData, dispatch),
    }
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignUpForm));