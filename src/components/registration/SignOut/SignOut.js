import React, { Component } from "react";
import { auth } from "firebase";
import { connect } from "react-redux";
import { actionRemoveUser } from "../../../redux/actions/userActions";
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
      <button className="sign-out" onClick={this.logout}>Sign Out</button>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchRemoveUser: () => dispatch(actionRemoveUser)
  }
};

export default connect(null, mapDispatchToProps)(SignOutButton);