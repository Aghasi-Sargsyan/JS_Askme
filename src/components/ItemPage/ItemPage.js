import React, { Component } from "react";
import Answer from "./Answer/Answer";
import Wysiwyg from "../universal/Wysiwyg/Wysiwyg";
import { connect } from "react-redux";
import Question from "./Question/Question";
import './ItemPage.scss';

class ItemPage extends Component {

    state = {
        question: {
            id: null,
            userId: null,
            title: null,
            description: null,
            rate: null,
            answerCount: null,
            date: null,
            update: null,
            skills: [],
            age: null,
            gender: null,
        },
        id: this.props.match.params.id
    };

    componentDidMount() {
        const question = this.props.questions.filter((question) => this.state.id === question.id);
        this.setState({
            question: { ...question[0] }
        });
    }

    render() {

        return (
            <div className='question__page'>
                <Question question={this.state.question} />
                <hr />
                <h4>Answers</h4>
                <Answer />
                <hr />
                <h4>Your Answer</h4>
                <Wysiwyg />
                <button className='answer_submit' onClick={this.onSubmit}>Post your answer</button>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questionReducer.questions
    }
};

export default connect(mapStateToProps)(ItemPage);