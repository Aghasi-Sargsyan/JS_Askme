import React from 'react';
import Logo from '../universal/Logo/Logo';
import NavBar from '../NavBar/NavBar';

import "./Header.scss";

const Header = props => (
    <header>
        <nav className="navigation">
            <Logo />
            <div className="space" />
            <NavBar />
        </nav>
    </header>
);

export default Header;