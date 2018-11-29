import React, { Component } from "react";
import Avatar from '../../universal/Avatar/Avatar';
import "./UserInfo.scss";

class UserInfo extends Component {
    render() {
        const { userName,age,gender } = this.props;
        return (
            <div className='user_info'>
                <div className="user_info_img">
                        <Avatar />
                </div>
                <div>
                    <div className="user_info_name">Username:
                        <span>{userName}</span>
                    </div>
                    <div className="user_info_gender">Gender:
                        <span>{gender}</span>
                    </div>
                    <div className="user_info_age">Age:
                        <span>{age}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;