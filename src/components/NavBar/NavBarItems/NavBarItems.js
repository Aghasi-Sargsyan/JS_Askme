import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import routePaths from '../../../constKeys/routePaths';
import answerIcon from '../../../assets/icons/answerIcon.png';
import questionIcon from '../../../assets/icons/questionIcon.png';
import Avatar from '../../universal/Avatar/Avatar';
import InfoDrop from "../InfoDrop/InfoDrop";
import "./NavBarItems.scss";

class NavBarItems extends Component {
    state = {
        infoOpen: false
    };

    componentDidMount() {
        this.isMount = true;
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillMount() {
        if (this.isMount) {
            this.props.history.listen(this.handleInfoDrop);
        }
    }

    componentWillUnmount() {
        this.isMount = false;
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleInfoDrop = e => {
        this.setState(prevState => ({
            infoOpen: !prevState.infoOpen
        }));
    };

    handleClickOutside = event => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                infoOpen: false
            });
        }
    };

    render() {
        return (
            <ul>
                <li>
                    <NavLink activeStyle={{ fontWeight: 'bold', color: '#000' }} to={routePaths.questionPage}>
                        <img className='answer-icon' src={answerIcon} />Answers
                    </NavLink>
                </li>

                <li className="img-li" ref={(node) => this.wrapperRef = node}>
                    <Avatar clicked={this.handleInfoDrop} />
                    {this.state.infoOpen && <InfoDrop close={this.handleInfoDrop} />}
                </li>

                <li>
                    <NavLink activeStyle={{ fontWeight: 'bold', color: '#000' }} to={routePaths.askQuestionPage}>
                        <img className='question-icon' src={questionIcon} />Ask a Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to={routePaths.itemPage}>
                        Item
                    </NavLink>
                </li>
            </ul>
        )
    }
}

export default NavBarItems;