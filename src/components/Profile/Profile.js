import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfo from './UserInfo/UserInfo';
import SkillContainer from '../SkillContainer/SkillContainer';
import ProfileQuestionsCont from './ProfileQuestionsCont/ProfileQuestionsCont';
import "./Profile.scss";
import { NavLink } from "react-router-dom";
import routePaths from "../../constKeys/routePaths";

class Profile extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { user } = this.props;
        console.log(this.props);
        return (
            user &&
            <div className="profile_page">
                <aside className="left__side">
                    <UserInfo userName={user.userName} age={user.age} gender={user.gender} />
                    <SkillContainer skills={user.skills} saturation={100} />
                </aside>
                <aside className="right__side flex flex_column">
                    <div className='flex justify_center profile_questions_tab'>
                        <div className="my__questions__btn">
                            <NavLink to={routePaths.myQuestions}>My Questions</NavLink>
                        </div>
                        <div className="my__answers__btn">
                            <NavLink to={routePaths.answeredQuestions}>Answered Questions</NavLink>
                        </div>
                    </div>
                    <div>
                        <div className='question_item_header flex align_center'>
                            <div className='flex_grow'>
                                <div>Type</div>
                            </div>
                            <div className='flex question__item_header_txt'>
                                <div>Votes</div>
                                <div>Answers</div>
                                <div className='empty_div'></div>
                            </div>
                        </div>
                        <ProfileQuestionsCont />
                    </div>
                </aside>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    };
}

export default connect(mapStateToProps)(Profile);