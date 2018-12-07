import React, {Component} from "react";
import Answer from "./Answer/Answer";
import Wysiwyg from "../universal/Wysiwyg/Wysiwyg";
import {connect} from "react-redux";
import Question from "./Question/Question";
import './ItemPage.scss';
import FireManager, {dbPaths} from "../../firebase/FireManager";
import AskQuestionPage from "../AskQuestionPage/AskQuestionPage";

class ItemPage extends Component {

    state = {
        answerDesc: "",
        answers: [],
        wysiwygTxt: '',
        dbAnswers: [],
        question: null,
        isEdit: false,
        editedTitle: "",
        editedDescription: "",
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

    onEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    };

    onSubmit = () => {
        const {question} = this.state;
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

        FireManager.updateData({repliedUsers: this.props.user.id},
            {
                collectionPath: dbPaths.collections.QUESTIONS,
                docPath: this.state.id,
            });

        FireManager.updateData({answerCount: ++question.answerCount},
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
        const {user} = this.props;
        const {question, isEdit, dbAnswers, answers, wysiwygTxt} = this.state;

        return (
            question && <div className='question__page'>
                {!isEdit ? <Question question={question}/> : <AskQuestionPage isEdit question={question}/>}
                {question.userId === user.id &&
                <button onClick={this.onEdit}>
                    {isEdit ? "save" : "edit"}
                </button>}
                <hr/>
                <div className='flex align_center'>
                    {<span>{question.answerCount}</span>}
                    <h4>Answers</h4>
                </div>
                <hr/>
                {dbAnswers.map((answer) => <Answer answer={answer}
                                                   key={answer.id}/>)}
                {answers.map((answer, index) => <Answer answer={answer}
                                                        userName={user.userName}
                                                        key={index}/>)}
                <hr/>
                <h4>Your Answer</h4>
                <hr/>
                <Wysiwyg value={wysiwygTxt} changeHandler={this.handleChange}/>
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