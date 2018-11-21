import React, {Component} from "react";
import RegistrationContainer from "./RegistrationContainer/RegistrationContainer";
import connect from "react-redux/es/connect/connect";
import {auth} from "firebase";
import paths from "./config/paths";


class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem("login") === "true") {
            props.history.push(paths.questionPage);
        }
    }

    componentDidMount() {
        const {history} = this.props;
        auth().onAuthStateChanged(function (user) {
            if (user) {
                history.push(paths.questionPage);
            } else {
                // No user is signed in.
            }
        });
    }

    render() {
        return (
            <RegistrationContainer match={this.props.match} history={this.props.history}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.userReducer.authUser
    }
}

export default connect(mapStateToProps)(RegistrationPage);