import React, {PureComponent} from 'react';
import {FormControl, IconButton, Input, InputAdornment, InputLabel, withStyles} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {withRouter} from "react-router-dom";

class ThirdStep extends PureComponent {

    state = {
        password: "",
        newPassword: "",
        showPassword: false,
        showNewPassword: false
    };

    componentDidUpdate() {
        const {password, newPassword} = this.state;
        const isValid = (password === newPassword && password.length === 6) || (password === "" && newPassword === "");
        this.props.passValidator(isValid);
        isValid && this.handleSendData();
    }

    handleSendData = () => {
        const {password} = this.state;
        const data = {password};
        this.props.sendData(data);
    };

    handleChange = name => event => {

        this.setState({
            [name]: event.target.value,
        });

    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    handleClickShowNewPassword = () => {
        this.setState(state => ({showNewPassword: !state.showNewPassword}));
    };

    render() {
        const {password, newPassword, showPassword, showNewPassword} = this.state;
        const {classes} = this.props;

        return (
            <div className={classes.thirdCont}>
                <form>
                    <div>
                        <FormControl className={`${classes.margin} ${classes.textField}`}>
                            <InputLabel htmlFor="adornment-password">New Password</InputLabel>
                            <Input
                                id="adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={this.handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    <div className='flex align_center'>
                        <FormControl className={`${classes.margin} ${classes.textField}`}>
                            <InputLabel htmlFor="adornment-password"> Confirm Password</InputLabel>
                            <Input
                                id="adornment-new-password"
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={this.handleChange('newPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowNewPassword}
                                        >
                                            {showNewPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                </form>
            </div>
        );
    }
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    thirdCont: {
        height: 170,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        "&>div": {
            marginBottom: 20
        }
    }
});


export default withStyles(styles)(ThirdStep);