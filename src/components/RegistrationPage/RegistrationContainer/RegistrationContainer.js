import React from "react";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import {withRouter} from "react-router-dom";
import rotePaths from "../../../constKeys/rotePaths";

function RegistrationContainer(props) {

    function rend() {
        const {match} = props;

        switch (match.path) {
            case "/":
                return <SignInForm/>;
            case rotePaths.signIn:
                return <SignInForm/>;
            case rotePaths.signUp:
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