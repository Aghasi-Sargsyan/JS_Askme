import React, { Component } from 'react'
import { connect } from 'react-redux';

class ProfileQuestionContainer extends Component {


    render() {
        return (
            <div>

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
