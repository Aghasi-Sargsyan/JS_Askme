import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionPage extends Component {

    render() {
        return (
            <div>
                <h1>Welcome to Questions Page</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dbUser: state.userReducer.dbUser,
    };
}

export default connect(mapStateToProps)(QuestionPage);