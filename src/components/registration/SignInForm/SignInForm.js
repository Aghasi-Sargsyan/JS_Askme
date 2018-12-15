import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "firebase";
import routePaths from "../../../constKeys/routePaths";
import isEmail from "validator/lib/isEmail";
import FireManager from "../../../firebase/FireManager";
import { bindActionCreators } from "redux";
import { actionAddUserData } from "../../../redux/actions/userActions";
import connect from "react-redux/es/connect/connect";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import './SignInForm.scss'

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
        height: '40px',
        marginTop: theme.spacing.unit * 3,
    },
    blue: {
        backgroundColor: '#04a9f5',
        color: '#fff'
    },
});


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

    loginWithGoogle = () => {
        const googleProvider = new auth.GoogleAuthProvider();
        auth().signInWithPopup(googleProvider)
            .then(userCredential => {
                return userCredential.user
            })
            .then(user => {
                const newUser = {
                    id: user.uid,
                    userName: user.displayName,
                    email: user.email,
                    gender: "",
                    age: 0,
                    photoUrl: user.photoURL,
                    skills: [],
                    isNewUser: true
                };
                //adding user to DB
                FireManager.addUser(newUser);
                this.props.dispatchUser(newUser);

            }).catch(function (error) {
                console.error(error.message);
            });
    };

    loginWithFb = () => {
        const fbProvider = new auth.FacebookAuthProvider();
        const { history } = this.props;

        auth().signInWithPopup(fbProvider).then((result) => {
            history.push(routePaths.questionPage)
        }).catch(function (error) {
            console.error(error.message)
        });
    };

    loginWithTwitter = () => {
        const twitterProvider = new auth.TwitterAuthProvider();
        const { history } = this.props;

        auth().signInWithPopup(twitterProvider).then((result) => {
            history.push(routePaths.questionPage)
        }).catch(function (error) {
            console.error(error.message)
        });
    };

    render() {
        const { formErrors, disabled } = this.state;
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
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
                        {formErrors.loginError.length > 0 && (
                            <span className="error__message">{formErrors.loginError}</span>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={`${classes.submit} ${classes.blue}`}
                            onClick={this.login}
                            disabled={!!disabled}
                        >
                            Sign in
                            </Button>
                        <Link to={routePaths.signUp}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Sign up
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

export default withStyles(styles)(withRouter(connect(null, mapDispatchToProps)(SignInForm)));