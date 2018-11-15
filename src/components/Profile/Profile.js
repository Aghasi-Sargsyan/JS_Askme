import React, { Component } from 'react';
import {auth} from "firebase";
import FireManager from "../../config/fireManager";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        auth().signOut();
    }

    componentDidMount() {
        console.log(FireManager.getCurrentUser());
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
