import React, {Component} from "react";
import {connect} from 'react-redux';
import FireManager from "../../firebase/FireManager";
import * as firebase from "firebase";
import {withRouter} from "react-router-dom";
import routePaths from "../../constKeys/routePaths";
import {
    // Divider,
    // FormControl,
    // FormControlLabel,
    // IconButton,
    // Input,
    // InputAdornment,
    // InputLabel,
    // Radio,
    // RadioGroup,
    // TextField,
    withStyles
} from "@material-ui/core";

// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./SettingPage.scss";
import Button from "@material-ui/core/es/Button/Button";
import Stepper from "@material-ui/core/Stepper";
import {getStepContent, getSteps} from "./Stepper/Stepper";
import Typography from "@material-ui/core/Typography";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";

class SettingPage extends Component {

    state = {
        userName: "",
        password: "",
        newPassword: "",
        email: "",
        age: "",
        gender: "",
        showPassword: false,
        showNewPassword: false,
        activeStep: 0,
        skipped: new Set(),
    };

    componentDidMount() {
        const {user} = this.props;
        this.props.user && this.setState({
            userName: user.userName,
            email: user.email,
            age: (new Date().getFullYear() - user.age),
            gender: user.gender,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user.id !== this.props.user.id) {
            const {user} = this.props;
            this.props.user && this.setState({
                userName: user.userName,
                email: user.email,
                age: (new Date().getFullYear() - user.age),
                gender: user.gender,
            });
        }
    }

    // handleChange = e => {
    //     console.info(e.target.value);
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     });
    // }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        const {userName, age, gender} = this.state;
        FireManager.updateUser({
            userName,
            age,
            gender,
        }, this.props.user.id);

        const user = firebase.auth().currentUser;
        const p1 = user.updateEmail(this.state.email);
        const p2 = user.updatePassword(this.state.password);

        Promise.all([p1, p2])
            .catch(() => this.props.history.push(routePaths.profilePage))
    };


    // handleRadioButton = (e) => {
    //     this.setState({gender: e.target.value});
    // };
    //
    // handleClickShowPassword = () => {
    //     this.setState(state => ({showPassword: !state.showPassword}));
    // };
    //
    // handleClickShowNewPassword = () => {
    //     this.setState(state => ({showNewPassword: !state.showNewPassword}));
    // };

    isStepOptional = step => {
        return step === 0 || 1;
    };

    handleNext = () => {
        const {activeStep} = this.state;
        let {skipped} = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleSkip = () => {
        const {activeStep} = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }


    render() {
        // const {userName, age, password, newPassword, showPassword, showNewPassword} = this.state;
        // const {classes} = this.props;
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;

        return (
            <div className="setting__page">
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        if (this.isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <>
                            {getStepContent(activeStep)}
                            <div className={classes.stepBtns}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                                {this.isStepOptional(activeStep) && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleSkip}
                                        className={classes.button}
                                    >
                                        Skip
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                {/*<h1>{userName}</h1>*/}
                {/*<form className="flex flex_column">*/}
                {/*<div>*/}
                {/*<div className='flex align_center'>*/}
                {/*<TextField*/}
                {/*id="userName"*/}
                {/*label="Username"*/}
                {/*className={classes.textField}*/}
                {/*value={userName}*/}
                {/*onChange={this.handleChange("userName")}*/}
                {/*margin="normal"*/}
                {/*/>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<Divider/>*/}
                {/*<div className='flex align_center'>*/}
                {/*<TextField*/}
                {/*id="age"*/}
                {/*label="Birth Year"*/}
                {/*className={classes.textField}*/}
                {/*value={age}*/}
                {/*onChange={this.handleChange("age")}*/}
                {/*margin="normal"*/}
                {/*type="number"*/}
                {/*InputLabelProps={{*/}
                {/*shrink: true,*/}
                {/*}}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*<Divider/>*/}
                {/*<div className='setting__page_gender'>*/}
                {/*<span className={classes.gender}>Gender</span>*/}
                {/*<FormControl component="fieldset" className={classes.formControl}>*/}
                {/*<RadioGroup*/}
                {/*aria-label="gender"*/}
                {/*name="gender2"*/}
                {/*className={classes.group}*/}
                {/*value={this.state.gender}*/}
                {/*onChange={this.handleRadioButton}*/}
                {/*>*/}
                {/*<FormControlLabel*/}
                {/*value="female"*/}
                {/*control={<Radio color="primary"/>}*/}
                {/*label="Female"*/}
                {/*labelPlacement="start"*/}
                {/*/>*/}
                {/*<FormControlLabel*/}
                {/*value="male"*/}
                {/*control={<Radio color="primary"/>}*/}
                {/*label="Male"*/}
                {/*labelPlacement="start"*/}
                {/*/>*/}
                {/*</RadioGroup>*/}
                {/*</FormControl>*/}
                {/*</div>*/}
                {/*<Divider/>*/}
                {/*<div>*/}
                {/*<FormControl className={`${classes.margin} ${classes.textField}`}>*/}
                {/*<InputLabel htmlFor="adornment-password">New Password</InputLabel>*/}
                {/*<Input*/}
                {/*id="adornment-password"*/}
                {/*type={showPassword ? 'text' : 'password'}*/}
                {/*value={password}*/}
                {/*onChange={this.handleChange('password')}*/}
                {/*endAdornment={*/}
                {/*<InputAdornment position="end">*/}
                {/*<IconButton*/}
                {/*aria-label="Toggle password visibility"*/}
                {/*onClick={this.handleClickShowPassword}*/}
                {/*>*/}
                {/*{showPassword ? <Visibility/> : <VisibilityOff/>}*/}
                {/*</IconButton>*/}
                {/*</InputAdornment>*/}
                {/*}*/}
                {/*/>*/}
                {/*</FormControl>*/}
                {/*</div>*/}
                {/*<div className='flex align_center'>*/}
                {/*<FormControl className={`${classes.margin} ${classes.textField}`}>*/}
                {/*<InputLabel htmlFor="adornment-password"> Confirm Password</InputLabel>*/}
                {/*<Input*/}
                {/*id="adornment-new-password"*/}
                {/*type={showNewPassword ? 'text' : 'password'}*/}
                {/*value={newPassword}*/}
                {/*onChange={this.handleChange('newPassword')}*/}
                {/*endAdornment={*/}
                {/*<InputAdornment position="end">*/}
                {/*<IconButton*/}
                {/*aria-label="Toggle password visibility"*/}
                {/*onClick={this.handleClickShowNewPassword}*/}
                {/*>*/}
                {/*{showNewPassword ? <Visibility/> : <VisibilityOff/>}*/}
                {/*</IconButton>*/}
                {/*</InputAdornment>*/}
                {/*}*/}
                {/*/>*/}
                {/*</FormControl>*/}
                {/*</div>*/}
                {/*<Divider/>*/}
                {/*<Button type="button" className="settings__save__btn" onClick={this.handleSubmit}>*/}
                {/*Save Changes*/}

                {/*</Button>*/}
                {/*</form>*/}
            </div>
        );
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    group: {
        flexDirection: "row-reverse"
    },
    gender: {
        display: 'inline-block',
        padding: 0,
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "1rem",
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        lineHeight: 1,
        transform: "translate(0, 1.5px) scale(0.75)"
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    stepBtns: {
        display: "flex",
        marginTop: "5%",
        justifyContent: "flex-end",
    }
});


const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(SettingPage)));

/*
render() {
    const { userName, email, age } = this.state;
    return (
        <div className="setting__page">
            <div className='setting__aside'>
                <div className='flex  align_center'>
                    <img className='setting-icon' src={settingIcon} alt='setting' />
                    <p>Settings</p>
                </div>
            </div>
            <div className="setting__profile">
                <h1>{userName}</h1>
                <form className="flex flex_column">
                    <div>
                        <div className='flex align_center'>
                            <label>Username </label>
                            <Input type="text"
                                   valid id="userName"
                                   value={userName}
                                   changeHandler={this.handleChange} />
                        </div>
                    </div>
                    <hr />
                    <div className='flex align_center'>
                        <label>Birth Year</label>
                        <Input
                            type="number"
                            id="age"
                            valid
                            value={age}
                            changeHandler={this.handleChange}
                        />
                    </div>
                    <hr />
                    <div className='setting__page_gender'>
                        <span className='pad_right_20'>Gender </span>
                        <label>
                            <input
                                type="radio"
                                name="genderGroup"
                                id="radioMale"
                                value="male"
                                checked={this.state.gender === "male"}
                                onChange={this.handleCheck}
                            />
                            <img src={male} alt="male" />
                        </label>
                        <label>
                            <input type="radio"
                                   name="genderGroup"
                                   value="female"
                                   id="radioFemale"
                                   checked={this.state.gender === "female"}
                                   onChange={this.handleCheck}
                            />
                            <img className='female' src={female} alt="female" />
                        </label>
                    </div>
                    <hr />
                    <div>
                        <div className='flex align_center'>
                            <label>Email </label>
                            <Input type="email" id="email" valid
                                   value={email}
                                   changeHandler={this.handleChange} />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className='flex align_center'>
                            <label>Update Password </label>
                            <Input type="password" id="password" valid changeHandler={this.handleChange} />
                        </div>
                    </div>
                    <hr />
                    <button type="button"
                            className="settings__save__btn"
                            onClick={this.handleSubmit}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
*/
