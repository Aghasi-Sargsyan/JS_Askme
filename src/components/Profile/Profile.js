import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfo from './UserInfo/UserInfo';
import SkillContainer from '../SkillContainer/SkillContainer';
import ProfileQuestionsCont from './ProfileQuestionsCont/ProfileQuestionsCont';
import { NavLink } from "react-router-dom";
import routePaths from "../../constKeys/routePaths";
import "./Profile.scss";

class Profile extends Component {
    render() {
        const { user } = this.props;
        console.log(this.props);
        return (
            user &&
            <div className="profile_page">
                <aside className="left__side">
                    <UserInfo userName={user.userName} age={user.age} gender={user.gender} />
                    <SkillContainer skills={user.skills} hue={257} saturation={100} />
                </aside>
                <aside className="right__side">
                    <div className="my__questions__btn">
                        <NavLink to={routePaths.myQuestions}>My Questions</NavLink>
                    </div>
                    <div className="my__answers__btn">
                        <NavLink to={routePaths.answeredQuestions}>Answered Questions</NavLink>
                    </div>

                    <ProfileQuestionsCont />
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