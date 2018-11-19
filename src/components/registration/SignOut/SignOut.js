import React, { Component } from "react";
import { auth } from "firebase";
import { Link } from "react-router-dom";

class SignOutButton extends Component {

  logout = () => {
    auth().signOut();
  };

  render() {
    return (
      <Link to="/signin">
        <button onClick={this.logout}>Sign Out</button>
      </Link>
    );
  }
}

export default SignOutButton;
