import React, { Component } from "react";
import QuestionsFilter from './QuestionsFilter/QuestionsFilter';
import QuestionsCont from './QuestionsCont/QuestionsCont';

class QuestionPage extends Component {

    render() {
        return (
            <div>
                <div className='flex'>
                    <QuestionsFilter />
                    <QuestionsCont />
                </div>

            </div>
        );
    }
}

export default QuestionPage;