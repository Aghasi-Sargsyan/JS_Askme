import React, {Component} from 'react';
import {auth} from "firebase";
import FireManager from "../../config/fireManager";
import AfterRegPopup from "./AfterRegPopup/AfterRegPopup";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {
            skillList: []
        }
    }

    logout() {
        auth().signOut();
    }

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if (user) {
                FireManager.getUser(user.uid).then(user => {
                    this.setState({
                        skillList: user.skills
                    });
                })
            }
        })
    }

    renderSkills = () => {
        return this.state.skillList.map((skill,index )=>
            <li key={index}>skill: {skill.value} rate: {skill.rate}</li>)
    };

    render() {
        return (
            <div>
                <ul>
                    {this.renderSkills()}
                </ul>
                <h1>Welcome to Profile Page</h1>
                <AfterRegPopup/>
                <button onClick={this.logout}>Logout</button>
            </div>
        );

    }

}

export default Profile;
