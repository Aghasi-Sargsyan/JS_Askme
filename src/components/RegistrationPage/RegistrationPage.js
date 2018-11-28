import React, { Component } from "react";
import RegistrationContainer from "./RegistrationContainer/RegistrationContainer";
import routePaths from "../../constKeys/routePaths";
import localKeys from "../../constKeys/localKeys";

class RegistrationPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RegistrationContainer/>
        );
    }
}

export default RegistrationPage;