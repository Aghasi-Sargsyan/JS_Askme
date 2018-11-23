import React, { Component } from "react";
import { connect } from 'react-redux';
import Avatar from '../../universal/Avatar/Avatar';

class UserInfo extends Component {

    render() {
        const age = this.props.dbUser && this.props.dbUser.age
        return (
            <div>
                <div className='am--flex'>
                    <Avatar />
                    <div>Age: <span>{age}</span></div>
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