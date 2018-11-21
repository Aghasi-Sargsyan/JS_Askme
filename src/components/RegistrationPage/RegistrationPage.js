import React, {Component} from "react";
import RegistrationContainer from "./RegistrationContainer/RegistrationContainer";
import connect from "react-redux/es/connect/connect";
import paths from "../../roteConfig/paths";


class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem("login") === "true") {
            props.history.push(paths.questionPage);
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