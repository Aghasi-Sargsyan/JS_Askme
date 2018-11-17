import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./registration/SignOut/SignOut";

const Navigation = ({ authUser }) => (
  <div>
    <ul>
      <li>
        <Link to="/signin">Sign In</Link>
      </li>
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
  </div>
);

export default Navigation;
