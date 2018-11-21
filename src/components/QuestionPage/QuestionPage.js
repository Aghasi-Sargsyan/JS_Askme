import React, { Component } from "react";
import QuestionsFilter from './QuestionsFilter/QuestionsFilter';
import QuestionsCont from './QuestionsCont/QuestionsCont';
import { connect } from "react-redux";

class QuestionPage extends Component {

    render() {
        console.log(this.props.user);
        return (
            <div>
                <h1>Welcome to Questions Page</h1>

                <div className='am--flex'>
                    <QuestionsFilter />
                    <QuestionsCont />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    };
}

export default connect(mapStateToProps)(QuestionPage);