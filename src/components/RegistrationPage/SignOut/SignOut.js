import React, {Component} from "react";
import {auth} from "firebase";
import {connect} from "react-redux";
import {actionRemoveUser} from "../../../redux/actions/userActions";

class SignOutButton extends Component {

    logout = () => {
        auth().signOut()
            .then(() => {
                    this.props.dispatch(actionRemoveUser);
                    localStorage.setItem("login", "false");
                }
            );
    };

    render() {
        return (
            <button onClick={this.logout}>Sign Out</button>
        );
    }
}


export default connect()(SignOutButton);
