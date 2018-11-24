import React, { Component } from 'react';
import UserInfo from './UserInfo/UserInfo';
import ProfileQuestionsCont from './ProfileQuestionsCont/ProfileQuestionsCont';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            skillList: []
        }
    }

    renderSkills = () => {
        return this.state.skillList.map((skill, index) =>
            <li key={index}>skill: {skill.value} rate: {skill.rate}</li>)
    };

    render() {
        return (
            <div>
                <ul>
                    {this.renderSkills()}
                </ul>
                <h1>Welcome to Profile Page</h1>
                <UserInfo />
                <ProfileQuestionsCont />
            </div>
        );

    }
}

export default Profile;