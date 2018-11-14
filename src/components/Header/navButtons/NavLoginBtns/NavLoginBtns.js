import React from 'react';
import "./NavLoginBtns.scss";

const NavLoginBtns = props => ( 
    <div className="navigation-items-l">
        <ul>
            <li>
                <a href="/">Sign In</a>
            </li>
            <span>or</span>
            <li>
                <a href="/">Sign Up</a>
            </li>
        </ul>
    </div>
);

export default NavLoginBtns;