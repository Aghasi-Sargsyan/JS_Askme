import React from "react";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import {Route} from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";

const RegistrationContainer = props => {

  return (
    <div>
      <Route path={"/"} component={SignInForm}/>
      <Route path={routePaths.signIn} component={SignInForm}/>
      <Route path={routePaths.signUp} component={SignUpForm}/>
    </div>
  );
};

export default RegistrationContainer;