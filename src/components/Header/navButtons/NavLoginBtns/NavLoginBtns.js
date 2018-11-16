import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./NavLoginBtns.scss";

const NavLoginBtns = props => (
    <div className="navigation-items-l">
        <ul>
            <li>
                <Link to="/signIn">Sign In</Link>
            </li>
            <span>or</span>
            <li>
                <Link to="/signUp">Sign Up</Link>
            </li>
        </ul>
    </div>
);

export default NavLoginBtns;