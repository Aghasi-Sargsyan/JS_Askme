import React, {Component} from "react";
import {auth} from "firebase";
import {connect} from "react-redux";
import {actionRemoveUser} from "../../../redux/actions/userActions"
import logOutIcon from "../../../assets/icons/logout.png";
import "./SignOut.scss";

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class SignOutButton extends Component {

    logout = () => {
        auth().signOut()
            .then(() => {
                    this.props.dispatchRemoveUser();
                }
            );
    };

    render() {
        const { classes, className } = this.props;

        return (
            <a className="sign-out" onClick={this.logout}>
                Sign Out
                <img src={logOutIcon} alt="SignOut" />
            </a>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchRemoveUser: () => dispatch(actionRemoveUser)
    }
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignOutButton));