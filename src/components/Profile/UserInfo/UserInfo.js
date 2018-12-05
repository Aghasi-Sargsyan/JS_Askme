import React, {Component} from "react";
import Avatar from '../../universal/Avatar/Avatar';
import "./UserInfo.scss";
import male from "../../../assets/icons/male.png";
import female from "../../../assets/icons/female.png";

class UserInfo extends Component {

    render() {
        const {userName, age, gender} = this.props.user;
        return (
            <div className='user_info'>
                <div className="user_info_img">
                    <Avatar/>
                </div>
                <div>
                    <div className="user_info_item user_info_name">
                        <label className="username__label">Username:</label>
                        <span>{userName}</span>
                    </div>
                    <div className="user_info_item user_info_age">
                        <label className="age__label">Age:</label>
                        <span>{age}</span>
                    </div>
                    <div className="user_info_item user_info_gender">
                        <label className="gender__label">Gender:</label>
                        <span>{gender && <img src={gender === "male" ? male : female} alt="gender"/>}</span>
                    </div>
                    <div className="user_info_item user_info_wisdom">
                        <label className="wisdom__label">Wisdom</label>
                        <span className="wisdom__span">5</span>
                    </div>
                    <div className="user_info_item user_info_skills">
                        <label className="skills__label">Skills</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;