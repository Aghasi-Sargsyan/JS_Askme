import React from 'react';
import "./DrawerToggleBtn.scss";

const DrawerToggleBtn = props => (
    <button className="toggle-btn" onClick={props.click}>
        <div></div>
        <div></div>
        <div></div>
    </button>
);

export default DrawerToggleBtn;