import React from 'react';
import Logo from '../universal/Logo/Logo';
import NavBar from '../NavBar/NavBar';
import "./Header.scss";

const Header = () => (
    <header>
        <nav className="navigation flex">
            <hr className='horizontal__line'/>
            <Logo/>
            <div className="space"/>
            <NavBar/>
        </nav>
    </header>
);

export default Header;