import React, { Component } from "react";
import QuestionsFilter from './QuestionsFilter/QuestionsFilter';
import QuestionsCont from './QuestionsCont/QuestionsCont';

class QuestionPage extends Component {

    render() {
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

export default QuestionPage;