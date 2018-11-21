import React from "react";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import {withRouter} from "react-router-dom";
import paths from "../../../roteConfig/paths";

function RegistrationContainer(props) {

    function rend() {
        const {match} = props;

        switch (match.path) {
            case "/":
                return <SignInForm/>;
            case paths.signIn:
                return <SignInForm/>;
            case paths.signUp:
                return <SignUpForm/>;
            default:
        }
    }

    return (
        <div>
            {rend()}
        </div>
    );

}

export default withRouter(RegistrationContainer);