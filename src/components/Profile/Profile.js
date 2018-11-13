import React, { Component } from 'react';
import fire from '../../config/Fire';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <h1>Welcome to Profile Page</h1>
                <button onClick={this.logout}>Logout</button>
            </div >
        );

    }

}

export default Profile;
