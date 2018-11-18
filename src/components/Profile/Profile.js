import React, {Component} from "react";
import {auth} from "firebase";
import FireManager from "../../config/fireManager";
import AfterRegPopup from "./AfterRegPopup/AfterRegPopup";

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if (user) {
                FireManager.getUserSkills(user.uid).then(skills => {
                    this.setState({
                        skillList: skills
                    });
                })
            }
        })
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
                <AfterRegPopup/>
            </div>
        );

    }
}

export default Profile;
