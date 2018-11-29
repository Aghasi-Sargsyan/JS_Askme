import React, {Component} from "react";
import {auth} from "firebase";
import {connect} from "react-redux";
import {actionRemoveUser} from "../../../redux/actions/userActions";
import "./SignOut.scss";


class SignOutButton extends Component {

  logout = () => {
    auth().signOut()
      .then(() => {
          this.props.dispatch(actionRemoveUser);
        }
      );
  };

  render() {
    return (
      <button className="sign-out" onClick={this.logout}>Sign Out</button>
    );
  }
}

export default connect()(SignOutButton);
