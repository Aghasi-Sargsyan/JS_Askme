import React, { Component } from "react";
import { auth } from "firebase";
import { connect } from "react-redux";
import { actionRemoveUser } from "../../../redux/actions/userActions"
import { FaSignOutAlt } from 'react-icons/fa';
import "./SignOut.scss";

class SignOutButton extends Component {

    logout = () => {
        auth().signOut()
            .then(() => {
                this.props.dispatchRemoveUser();
            }
            );
    };

    render() {
        return (
            <a className="sign-out" onClick={this.logout}>
                Sign Out
                <FaSignOutAlt />
            </a>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchRemoveUser: () => dispatch(actionRemoveUser)
    }
};

export default connect(null, mapDispatchToProps)(SignOutButton);