import React from 'react';
import { NavLink } from "react-router-dom";
import Avatar from '../../universal/Avatar/Avatar';
import SearchBox from "../../SearchBox/SearchBox";
import SignOutButton from '../../RegistrationPage/RegistrationContainer/SignOut/SignOut';

import "./NavBarItems.scss";

const NavBarItems = () => {
    return (
        <ul>
            <li>
                <NavLink to="/questions">
                    QuestionsForYou
                </NavLink>
            </li>

            <li>
                <SearchBox />
            </li>

            <li className="img-li">
                <NavLink to="/profile">
                    <Avatar />
                </NavLink>
            </li>

            <li>
                <NavLink to="/ask-question">
                    Ask a Question
              </NavLink>
            </li>
            <li>
                <SignOutButton />
            </li>
        </ul>
    )
}

export default NavBarItems;