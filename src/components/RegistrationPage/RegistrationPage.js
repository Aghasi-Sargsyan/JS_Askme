import React, { Component } from "react";
import RegistrationContainer from "./RegistrationContainer/RegistrationContainer";
import connect from "react-redux/es/connect/connect";
import routePaths from "../../constKeys/routePaths";
import localKeys from "../../constKeys/localKeys";


class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem(localKeys.isUserLoggedIn) === "true") {
            props.history.push(routePaths.questionPage);
        }
    }

    render() {
        return (
            <RegistrationContainer/>
        );
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.userReducer.authUser
    }
}

export default connect(mapStateToProps)(RegistrationPage);