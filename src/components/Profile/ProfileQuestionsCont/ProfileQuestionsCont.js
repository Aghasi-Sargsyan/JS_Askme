import React, { Component } from 'react'
import { connect } from 'react-redux';
import ProfileQuestionItem from './ProfileQuestionItem/ProfileQuestionItem';

class ProfileQuestionContainer extends Component {
    render() {
        return (
            <div>
                <ProfileQuestionItem />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};
export default connect(mapStateToProps)(ProfileQuestionContainer);
