import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn/SignIn";

class RegistrationContainer extends Component {
    render() {
        return (
            <div>
                <SignIn />
            </div>
        );
    }
}

export default RegistrationContainer;