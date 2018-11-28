import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfo from './UserInfo/UserInfo';
import SkillContainer from '../SkillContainer/SkillContainer';
import ProfileQuestionsCont from './ProfileQuestionsCont/ProfileQuestionsCont';
import  "./Profile.scss";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            skillList: [
                {type: "HTML", rate: 89},
                {type: "CSS", rate: 48},
                {type: "JavaScript", rate: 75},
            ]
        }
    }

    // renderSkills = () => {
    //     return this.state.skillList.map((skill, index) =>
    //         <li key={index}>skill: {skill.value} rate: {skill.rate}</li>)
    // };

    render() {
        const { dbUser } = this.props;
        return (
            <div className="profile_page">
                <aside className="left__side">
                    <UserInfo userName={dbUser.userName} age={dbUser.age} gender={dbUser.gender} />
                    <SkillContainer skills={dbUser.skills} hue={257} saturation={100}  />
                </aside>
                <aside className="right__side">
                    <ProfileQuestionsCont />
                </aside>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        dbUser: state.userReducer.dbUser,
    };
}

export default connect(mapStateToProps)(Profile);