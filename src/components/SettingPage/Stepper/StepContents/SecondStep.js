import React, {Component} from 'react';
import {Divider, FormControl, FormControlLabel, Radio, RadioGroup, TextField, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionAddUserData} from "../../../../redux/actions/userActions";

class SecondStep extends Component {

    state = {
        age: "",
        gender: "",
    };

    componentDidMount() {
        const {user} = this.props;
        this.props.user && this.setState({
            age: (new Date().getFullYear() - user.age),
            gender: user.gender,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user.id !== this.props.user.id) {
            const {user} = this.props;
            this.props.user && this.setState({
                age: (new Date().getFullYear() - user.age),
                gender: user.gender,
            });
        }
    }

    handleRadioButton = (e) => {
        this.setState({gender: e.target.value});
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {age} = this.state;
        const {classes} = this.props;
        return (
            <div className={classes.secondStep}>
                <TextField
                    id="age"
                    label="Birth Year"
                    className={classes.textField}
                    value={age}
                    onChange={this.handleChange("age")}
                    margin="normal"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <div className={classes.genderCont}>
                    <span className={classes.gender}>Gender</span>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="gender"
                            name="gender2"
                            className={classes.group}
                            value={this.state.gender}
                            onChange={this.handleRadioButton}
                        >
                            <FormControlLabel
                                value="female"
                                control={<Radio color="primary"/>}
                                label="Female"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="male"
                                control={<Radio color="primary"/>}
                                label="Male"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    group: {
        flexDirection: "row-reverse"
    },
    gender: {
        position: "relative",
        bottom: 50,
        left: 60,
        padding: 0,
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "1rem",
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        lineHeight: 1,
        transform: "translate(0, 1.5px) scale(0.75)"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    secondStep: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: 170

    },
    genderCont: {
        display: "flex",
        alignItems: "flex-end",
        "& label": {
            margin: "0 15px"
        }
    }

});

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUser: bindActionCreators(actionAddUserData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SecondStep));