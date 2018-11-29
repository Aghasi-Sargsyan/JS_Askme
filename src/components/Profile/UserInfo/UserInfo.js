import React, { Component } from "react";
import Avatar from '../../universal/Avatar/Avatar';
import "./UserInfo.scss";
import male from "../../../assets/icons/male.png";
import female from "../../../assets/icons/female.png";

class UserInfo extends Component {
    render() {
        const { userName,age,gender } = this.props;
        return (
            <div className='user_info'>
                <div className="user_info_img">
                        <Avatar />
                </div>
                <div>
                    <div className="user_info_name">
                        <label className="username__label">Username:</label>
                        <span>{userName}</span>
                    </div>
                    <div className="user_info_age">
                        <label className="age__label">Age:</label>
                        <span>{age}</span>
                    </div>
                    <div className="user_info_gender">
                        <label className="gender__label">Gender:</label>
                        <span>{ gender && <img src={gender === "male" ? male : female} alt="gender" /> }</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;