import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import routePaths from '../../../constKeys/routePaths';
import answerIcon from '../../../assets/icons/answerIcon.png';
import questionIcon from '../../../assets/icons/questionIcon.png';
import defaultAvatar from '../../../assets/profileImg.png';
import InfoDrop from "../InfoDrop/InfoDrop";
import Avatar from '../../universal/Avatar/Avatar';
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
        const { photoUrl } = this.props.user;
        return (
            <>
                <ul className='navbar__item navbar__item_left'>
                    <li>
                        <NavLink activeStyle={{ fontWeight: 'bold', color: '#000' }} to={routePaths.questionPage}>
                            <img className='answer-icon' src={answerIcon} alt='answer' />Answers
                        </NavLink>
                    </li>

                    <li>
                        <NavLink activeStyle={{ fontWeight: 'bold', color: '#000' }} to={routePaths.askQuestionPage}>
                            <img className='question-icon' src={questionIcon} alt='question' />Ask a Question
                        </NavLink>
                    </li>
                </ul>
                <ul className='navbar__item navbar__item_right'>
                    <li className="img-li" ref={(node) => this.wrapperRef = node}>
                        {/* <img src={avatar} onClick={this.handleInfoDrop} alt="avatar" /> */}
                        <Avatar isClickable onClick={this.handleInfoDrop} src={photoUrl ? photoUrl : defaultAvatar} />
                        {this.state.infoOpen && <InfoDrop close={this.handleInfoDrop} />}
                    </li>
                </ul>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer
});

export default connect(mapStateToProps)(NavBarItems);