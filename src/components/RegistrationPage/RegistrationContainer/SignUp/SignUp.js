import React from "react";
import { withRouter } from "react-router-dom";
import SignUpForm from './SignUpForm';
import "./SignUp.scss";

const SignUp = ({ history }) => (
  <div>
    <SignUpForm history={history} />
  </div>
);

export default withRouter(SignUp);