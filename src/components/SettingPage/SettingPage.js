import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {actionAddUserData} from "../../redux/actions/userActions";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import Stepper from "@material-ui/core/Stepper";
import {getStepContent, getSteps} from "./Stepper/Stepper";
import Typography from "@material-ui/core/Typography";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import {actionRemoveUser} from "../../redux/actions/userActions";
import routePaths from "../../constKeys/routePaths";
import * as firebase from "firebase";
import FireManager from "../../firebase/FireManager";
import "./SettingPage.scss";

class SettingPage extends Component {

    state = {
        activeStep: 0,
        skipped: new Set(),
        user: {
            userName: "",
            photoUrl: "",
            age: 0,
            gender: "",
            password: ""
        },
        isPasswordValid: true
    };

    componentDidMount() {
        const {user} = this.props;
        this.props.user && this.setState({
            user: {...this.state.user, ...user}
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user.id !== this.props.user.id) {
            const {user} = this.props;
            this.props.user && this.setState({
                user: {...this.state.user, ...user}
            });
        }
    }

    handleSubmit = () => {
        const user = firebase.auth().currentUser;
        user.updatePassword(this.state.user.password).then(() =>
            firebase.auth().signOut().then(() => {
                    this.props.dispatchRemoveUser();
                    this.props.history.push(routePaths.signIn);
                }
            )
        ).catch(() =>
            firebase.auth().signOut().then(() => {
                    this.props.dispatchRemoveUser();
                    this.props.history.push(routePaths.signIn);
                }
            )
        )
    };


    isStepOptional = step => {
        return step === 0 || 1;
    };

    handleGetData = (data) => {
        this.setState({user: {...this.state.user, ...data}});
    };

    passValidator = isValid => {
        this.setState({isPasswordValid: isValid});
    };

    handleNext = () => {
        const steps = getSteps();
        const {activeStep, user} = this.state;
        let {skipped} = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        if (activeStep === steps.length - 1) {

            FireManager.updateUser({
                photoUrl: user.photoUrl,
                userName: user.userName,
                age: user.age,
                gender: user.gender
            }, this.props.user.id);


            this.props.dispatchUser({
                photoUrl: user.photoUrl,
                userName: user.userName,
                age: user.age,
                gender: user.gender
            });
            this.handleSubmit();
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

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }


    render() {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep, isPasswordValid} = this.state;

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
                    {getStepContent(activeStep, this.handleGetData, this.passValidator)}
                    <div className={classes.stepBtns}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                        >
                            Back
                        </Button>
                        <Button
                            disabled={activeStep === steps.length - 1 && !isPasswordValid}
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUser: bindActionCreators(actionAddUserData, dispatch),
        dispatchRemoveUser: () => dispatch(actionRemoveUser)
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SettingPage)));