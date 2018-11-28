import React from "react";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { withRouter } from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";

const RegistrationContainer = props => {

    function rend() {
        const {match} = props;

        switch (match.path) {
            case "/":
                return <SignInForm/>;
            case routePaths.signIn:
                return <SignInForm/>;
            case routePaths.signUp:
                return <SignUpForm/>;
            default:
        }
    }

    return (
        <div>
            {rend()}
        </div>
    );

};

export default withRouter(RegistrationContainer);