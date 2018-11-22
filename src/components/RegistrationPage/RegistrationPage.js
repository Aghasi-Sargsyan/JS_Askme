import React, {Component} from "react";
import RegistrationContainer from "./RegistrationContainer/RegistrationContainer";
import connect from "react-redux/es/connect/connect";
import rotePaths from "../../constKeys/rotePaths";
import localKeys from "../../constKeys/localKeys";


class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem(localKeys.isUserLoggedIn) === "true") {
            props.history.push(rotePaths.questionPage);
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