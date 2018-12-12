import React, {Component} from "react";
import {auth} from "firebase";
import {connect} from "react-redux";
import {actionRemoveUser} from "../../../redux/actions/userActions";
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
            <a className="sign-out" onClick={this.logout}>Sign Out</a>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchRemoveUser: () => dispatch(actionRemoveUser)
    }
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignOutButton));