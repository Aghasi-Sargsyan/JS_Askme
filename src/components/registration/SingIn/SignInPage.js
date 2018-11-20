import React from "react";
import { withRouter } from "react-router-dom";
import SignInForm from './SignInForm';
import SignUpLink from './SignUpLink'

const SignInPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
    <SignUpLink />
  </div>
);

export default withRouter(SignInPage);