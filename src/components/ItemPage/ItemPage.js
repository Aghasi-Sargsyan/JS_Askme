import React, { Component } from "react";
import Answer from "./Answer/Answer";
import Wysiwyg from "../universal/Wysiwyg/Wysiwyg";
import { connect } from "react-redux";
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
        console.log(question);
        this.setState({
            question: { ...question[0] }
        });
    }

    render() {

        return (
            <div className='question__page'>
                <div className='question__title'>
                    {this.state.question.title}
                </div>
                <hr />
                <div className='question__desc'>
                    {this.state.question.description}
                </div>
                <hr />
                <Answer />
                <hr />
                <Wysiwyg />
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