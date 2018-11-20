import React, {Component} from "react";
import {auth} from "firebase";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionRemoveUser} from "../../../redux/actions/userActions";

class SignOutButton extends Component {

    logout = () => {
        auth().signOut().then(() => this.props.dispatch(actionRemoveUser)
        );
    };

    render() {
        return (
            <Link to="/signin">
                <button className="sign-out" onClick={this.logout}>Sign Out</button>
            </Link>
        );
    }
}


export default connect()(SignOutButton);
