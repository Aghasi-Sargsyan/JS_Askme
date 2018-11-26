import React, { Component } from "react";
import { connect } from 'react-redux';
import Avatar from '../../universal/Avatar/Avatar';
import "./UserInfo.scss";

class UserInfo extends Component {
    state = {
        userName: "John Doe",
        age: 38,
        gender: "Male"
    };

    render() {
        return (
            <div className='user_info'>
                <div className="user_info_img">
                        <Avatar />
                </div>
                <div>
                    <div className="user_info_name">Username:
                        <span>{this.state.userName}</span>
                    </div>
                    <div className="user_info_gender">Gender:
                        <span>{this.state.gender}</span>
                    </div>
                    <div className="user_info_age">Age:
                        <span>{this.state.age}</span>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        dbUser: state.userReducer.dbUser,
    };
}

export default connect(mapStateToProps)(UserInfo);