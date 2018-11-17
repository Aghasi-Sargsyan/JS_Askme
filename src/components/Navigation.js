import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./registration/SignOut/SignOut";
import AuthUserContext from "./registration/AuthUserContext";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to="/questions">QUESTIONS</Link>
    </li>
    <li>
      <Link to="/profile">Profile</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to="/signin">Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
