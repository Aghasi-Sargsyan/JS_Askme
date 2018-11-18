import React, { Component } from "react";
import { auth } from "firebase";
import FireManager from "../../config/fireManager";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to Profile Page</h1>
      </div>
    );
  }
}

export default Profile;
