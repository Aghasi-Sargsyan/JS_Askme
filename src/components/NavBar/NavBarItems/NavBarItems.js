import React from 'react';
import { NavLink } from "react-router-dom";
import Avatar from '../../universal/Avatar/Avatar';
import SearchBox from "../../SearchBox/SearchBox";
import rotePaths from '../../../constKeys/rotePaths';
import "./NavBarItems.scss";
import SignOutButton from "../../RegistrationPage/SignOut/SignOut";
import SignOutButton from "../../RegistrationPage/SignOut/SignOut";
import "./NavBarItems.scss";

const NavBarItems = props => {
    return (
        <ul>
            <li>
                <NavLink to={rotePaths.questionPage}>
                    Questions For You
                </NavLink>
            </li>

            <li>
                <SearchBox />
            </li>

            <li className="img-li">
                <NavLink to={rotePaths.profilePage}>
                    <Avatar />
                </NavLink>
            </li>
            <li>
                <NavLink to={rotePaths.askQuestionPage}>
                    Ask a Question
                </NavLink>
            </li>
            <li>
                <SignOutButton />
            </li>
        </ul>
    )
};

export default NavBarItems;