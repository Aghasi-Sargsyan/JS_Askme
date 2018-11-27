import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Avatar from '../../universal/Avatar/Avatar';
import routePaths from '../../../constKeys/routePaths';
import "./NavBarItems.scss";
import InfoDrop from "../InfoDrop/InfoDrop";

class NavBarItems extends Component {
    state = {
        infoOpen: false

    };

    handleInfoDrop = () => {
        this.setState(prevState => ({
            infoOpen: !prevState.infoOpen
        }))
    };

    render() {
        return (
            <ul>
                <li className='nav__item'>
                    <Link to={routePaths.questionPage}>
                        Answers
                    </Link>
                </li>

                <li className="img-li">
                    <Avatar clicked={this.handleInfoDrop} />
                    {this.state.infoOpen && <InfoDrop />}
                </li>

                <li className='nav__item'>
                    <Link to={routePaths.askQuestionPage}>
                        Ask a Question
                    </Link>
                </li>
            </ul>
        )
    }
}

export default NavBarItems;