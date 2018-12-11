import React, {Component} from "react";
import {auth} from "firebase";
import {connect} from "react-redux";
import {actionRemoveUser} from "../../../redux/actions/userActions";
import "./SignOut.scss";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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
        const { classes } = this.props;

        return (this.logout());
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchRemoveUser: () => dispatch(actionRemoveUser)
    }
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignOutButton));