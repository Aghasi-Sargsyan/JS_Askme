import NavBarItems from "./NavBarItems/NavBarItems";
import React from 'react';
import { withRouter } from "react-router-dom";
import "./NavBar.scss";

const NavBar = ({ history }) => (
    <div className="navigation-bar flex">
        <NavBarItems history={history} />
    </div>
);

export default withRouter(NavBar);