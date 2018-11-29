import React, { Component } from 'react';
import UserInfo from './UserInfo/UserInfo';
import SkillContainer from '../SkillContainer/SkillContainer';
import ProfileQuestionsCont from './ProfileQuestionsCont/ProfileQuestionsCont';
import "./Profile.scss";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            skillList: [
                { type: "HTML", rate: 89 },
                { type: "CSS", rate: 48 },
                { type: "JavaScript", rate: 75 },
            ]
        }
    }

    // renderSkills = () => {
    //     return this.state.skillList.map((skill, index) =>
    //         <li key={index}>skill: {skill.value} rate: {skill.rate}</li>)
    // };

    render() {
        return (
            <div className="profile_page">
                {/* <ul>
                    {this.renderSkills()}
                </ul> */}
                <h1>Welcome to Profile Page</h1>
                <UserInfo />
                <SkillContainer skills={this.state.skillList} hue={257} saturation={100} />
                <ProfileQuestionsCont />
            </div>
        );

    }
}

export default Profile;