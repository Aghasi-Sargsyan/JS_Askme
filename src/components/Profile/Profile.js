import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfo from './UserInfo/UserInfo';
import SkillContainer from '../SkillContainer/SkillContainer';
import ProfileQuestionsCont from './ProfileQuestionsCont/ProfileQuestionsCont';
import  "./Profile.scss";
import { NavLink } from "react-router-dom";

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
                    <SkillContainer skills={user.skills} hue={257} saturation={100}  />
                </aside>
                <aside className="right__side">
                    <NavLink>My Questions</NavLink>
                    <NavLink>Answered Questions</NavLink>

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