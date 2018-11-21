import React from 'react';

import "./SideDrawer.scss";
import profileImg from "../../assets/profileImg.png";


const SideDrawer = props => {
    let classes = "side-drawer";
    (props.show)
        ? classes = "side-drawer open"
        : classes = "side-drawer";

    return (
        <nav className={classes}>
            <ul>
                <div>
                    <li className="img-li">
                        <a href="/">
                            <img src={profileImg} alt="Profile" />
                        </a>
                    </li>

                    <li className="ask-li">
                        <a href="/">Ask a Question</a>
                    </li>
                </div>

                <li className="question-li">
                <a href="/">Question</a>
                </li>
            </ul>
        </nav>

        /** Home SideDrawer */
        // <nav className={classes}>
        //     <ul>
        //         <li>
        //             <a href="/">Sign In</a>
        //         </li>
        //         <span>or</span>
        //         <li>
        //             <a href="/">Sign Up</a>
        //         </li>
        //     </ul>
        // </nav>
    );
};

export default SideDrawer;