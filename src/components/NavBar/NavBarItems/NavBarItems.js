import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Avatar from '../../universal/Avatar/Avatar';
import SearchBox from "../../SearchBox/SearchBox";

import "./NavBarItems.scss";
import InfoDrop from '../../InfoDrop/InfoDrop';


class NavBarItems extends Component {
    state = {
        infoOpen: false
    }

    handleInfoDrop = () => {
        this.setState(prevState => ({
            infoOpen: !prevState.infoOpen
        }))
    }

    render() {
        return (
            <ul>
                <li>
                    <NavLink to="/questionsForYou">
                        QuestionsForYou
                    </NavLink>
                </li>

                <li>
                    <SearchBox />
                </li>

                <li className="img-li">
                    <Avatar clicked={this.handleInfoDrop} />
                    { this.state.infoOpen && <InfoDrop />  }                  
                </li>

                <li>
                    <NavLink to="/askQuestion">
                        Ask a Question
                    </NavLink>
                </li>
            </ul>
        )
    }
}

export default NavBarItems;