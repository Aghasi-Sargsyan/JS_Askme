import React from 'react';
import { Link } from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";
import "./Logo.scss";

const Logo = () => (
    <div className="header__logo">
        <Link to={routePaths.questionPage}>
            <p className='font_m'><span className='logo__l'>A</span>sk<span className='logo__l'>M</span>e</p>
        </Link>
    </div>
);

export default Logo;