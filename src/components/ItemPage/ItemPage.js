import React, { Component } from "react";
import Answer from "./Answer/Answer";
import Wysiwyg from "../universal/Wysiwyg/Wysiwyg";
import { connect } from "react-redux";
import Question from "./Question/Question";
import Divider from '@material-ui/core/Divider';
import FireManager, { dbPaths } from "../../firebase/FireManager";
import './ItemPage.scss';


class ItemPage extends Component {

    state = {
        answerDesc: "",
        answers: [],
        wysiwygTxt: '',
        dbAnswers: [],
        question: null,
        id: this.props.match.params.id
    };

    componentDidMount() {
        FireManager.queryData({
            collectionPath: "questions",
            fieldPath: dbPaths.ID,
            operator: "==",
            value: this.state.id
        }).then(question => this.setState({
            question: question[0]
        }));

        this.getQuestionAnswers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user.id !== this.props.user.id) {
            this.getQuestionAnswers();
        }
    }

    getQuestionAnswers() {
        FireManager.queryData({
            collectionPath: "answers",
            fieldPath: dbPaths.QUESTION_ID,
            operator: "==",
            value: this.state.id
        }).then(answers => this.setState({
            dbAnswers: answers
        }));
    }

    onSubmit = () => {
        const { question } = this.state;
        const newAnswer = {
            userId: this.props.user.id,
            questionId: this.state.id,
            skills: question.skills,
            gender: question.gender,
            age: question.age,
            description: this.state.answerDesc,
            rate: 0,
            date: Date.now(),
            update: null,
        };
        FireManager.addAnswer(newAnswer, this.props.user.id);
        this.setState({
            answers: [...this.state.answers, newAnswer],
        });

        FireManager.updateData({ repliedUsers: this.props.user.id },
            {
                collectionPath: dbPaths.collections.QUESTIONS,
                docPath: this.state.id,
            });

        FireManager.updateData({ answerCount: ++question.answerCount },
            {
                collectionPath: dbPaths.collections.QUESTIONS,
                docPath: this.state.id,
            });
        this.setState({
            wysiwygTxt: ''
        })

    };

    handleChange = e => {
        if (typeof e === "string") {
            this.setState({
                answerDesc: e,
                wysiwygTxt: e
            });
        }
    };

    render() {
        return (
            <div className='question__page'>
                {this.state.question && <Question src={this.props.user.photoUrl} question={this.state.question} />}
                <div className='flex align_center answer_txt'>
                    {this.state.question && <span>{this.state.question.answerCount}</span>}
                    <h4>Answers</h4>
                </div>
                <Divider light />
                {this.state.dbAnswers.map((answer) => <Answer answer={answer}
                    key={answer.id} />)}
                {this.state.answers.map((answer, index) => <Answer answer={answer}
                    userName={this.props.user.userName}
                    key={index} />)}
                <h4>Your Answer</h4>
                <Divider light />
                <Wysiwyg value={this.state.wysiwygTxt} changeHandler={this.handleChange} />
                <button className='answer_submit' onClick={this.onSubmit}>Post your answer</button>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
};


export default connect(mapStateToProps)(ItemPage);