import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RegContainer extends Component {
  render() {
    return (
      <div>
        <Link to="/signin">
          <div>Sign In</div>
        </Link>

        <Link to="/signup">
          <div>Sign Up</div>
        </Link>
      </div>
    );
  }
}
