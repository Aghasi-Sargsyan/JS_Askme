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
        dbUser: state.userReducer.dbUser,
    }
};
export default connect(mapStateToProps)(ProfileQuestionContainer);
