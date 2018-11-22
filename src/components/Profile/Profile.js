import React, { Component } from 'react';
// import AfterRegPopup from "./AfterRegPopup/AfterRegPopup";
import UserInfo from './UserInfo/UserInfo';
class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            skillList: []
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome to Profile Page</h1>
                <UserInfo />
            </div>
        );

    }
}

export default Profile;