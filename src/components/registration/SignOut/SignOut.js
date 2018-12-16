import React, {Component} from "react";
import {auth} from "firebase";
import {connect} from "react-redux";
import {actionRemoveUser} from "../../../redux/actions/userActions";
import logOutIcon from "../../../assets/icons/logout.png";
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

export default connect(null, mapDispatchToProps)(SignOutButton);