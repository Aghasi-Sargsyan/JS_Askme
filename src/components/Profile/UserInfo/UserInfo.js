import React, { Component } from "react";
import { connect } from 'react-redux';
import Avatar from '../../universal/Avatar/Avatar';

class UserInfo extends Component {

    render() {
        // const age = this.props.dbUser && this.props.dbUser.age.map((skill, index) => {
        //     return <li key={index}>{skill.value}</li>
        // });
        const age = this.props.dbUser && this.props.dbUser.age


        console.log(this.props.dbUser && this.props.dbUser.age);
        return (
            <div>
                <h1>Welcome to Questions Page</h1>

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