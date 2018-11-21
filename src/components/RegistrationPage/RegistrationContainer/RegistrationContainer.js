import React from "react";
import SignInForm from "../SignInForm/SignInForm";
import {SignUpForm} from "../SignUpForm/SignUpForm";
import SignUpLink from "./SignUpLink";
import paths from "../config/paths";

function RegistrationContainer(props) {

    function rend() {
        const {match, history} = props;

        switch (match.path) {
            case "/":
                return <SignInForm history={history}/>;
            case paths.signIn:
                return <SignInForm history={history}/>;
            case paths.signUp:
                return <SignUpForm/>;
            default:
        }
    }

    return (
        <div>
            {rend()}
            {(props.match.path === paths.signIn || props.match.path === "/")
            && <SignUpLink/>}
        </div>
    );

}

export default RegistrationContainer;