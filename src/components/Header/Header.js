import React from 'react';
import logo from "../../assets/logo.png";
import "./Header.scss";
// import DrawerToggleBtn from '../SideDrawer/DrawerToggleBtn/DrawerToggleBtn';
import NavLoginBtns from './navButtons/NavLoginBtns/NavLoginBtns';
import NavQuestionBtns from './navButtons/NavQuestionBtns/NavQuestionBtns';

const Header = props => (
    <header>
        <nav className="navigation">
            {/* <div className="toggle-btn">
                <DrawerToggleBtn click={props.drawerClickHandler} />
            </div> */}
            <div className="logo">
                <a href="/">
                    <img src={logo} alt="Logo" />
                </a>
            </div>
            <div className="space"></div>
            {props.children}

            <NavLoginBtns />

            {/* <NavQuestionBtns /> */}
        </nav>
    </header>
);

export default Header;