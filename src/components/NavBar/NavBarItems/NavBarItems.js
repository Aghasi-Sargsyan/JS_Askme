import React from 'react';
import { NavLink } from "react-router-dom";
import Avatar from '../../universal/Avatar/Avatar';
import SearchBox from "../../SearchBox/SearchBox";
import rotePaths from '../../../constKeys/rotePaths';
import "./NavBarItems.scss";
import SignOutButton from "../../RegistrationPage/SignOut/SignOut";


const NavBarItems = props => {
    return (
        <ul>
            <li>
                <NavLink to={rotePaths.questionPage}>
                    QuestionsForYou
            </NavLink>
            </li>

            <li>
                <SearchBox />
            </li>

            <li className="img-li">
                <Avatar />
            </li>

            <li>
                <NavLink to="/askQuestion">
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