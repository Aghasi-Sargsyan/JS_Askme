import React,{ Component } from "react";
import { auth } from "firebase";
import { connect } from "react-redux";
import { actionRemoveUser } from "../../../redux/actions/userActions";
import { withRouter } from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";
import localKeys from "../../../constKeys/localKeys";
import "./SignOut.scss";


class SignOutButton extends Component {

    logout = () => {
        auth().signOut()
            .then(() => {
                    localStorage.setItem(localKeys.isUserLoggedIn, "false");
                    this.props.dispatch(actionRemoveUser);
                    this.props.history.push(routePaths.signIn)
                }
            );
    }

    render() {
        return (
            <button className="sign-out" onClick={this.logout}>Sign Out</button>
        );
    }
}

export default withRouter(connect()(SignOutButton));