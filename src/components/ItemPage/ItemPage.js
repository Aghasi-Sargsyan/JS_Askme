import React, {Component} from "react";
import Answer from "./Answer/Answer";
import Wysiwyg from "../universal/Wysiwyg/Wysiwyg";
import {connect} from "react-redux";
import Question from "./Question/Question";
import './ItemPage.scss';
import FireManager, {questionsFieldPaths} from "../../firebase/FireManager";

class ItemPage extends Component {

  state = {
    answerDesc: "",
    answers: [],
    dbAnswers: [],
    question: null,
    id: this.props.match.params.id
  };

  componentDidMount() {
    FireManager.getQuestions({
      fieldPath: questionsFieldPaths.ID,
      operator: "==",
      value: this.state.id
    }).then(question => this.setState({
      question: question[0]
    }));
    FireManager.getAnswers(this.props.user.id).then(answers => this.setState({
      dbAnswers: answers
    }));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user.id !== this.props.user.id) {
      FireManager.getAnswers(this.props.user.id).then(answers => this.setState({
        dbAnswers: answers
      }));
    }
  }

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

  };

  handleChange = e => {
    if (typeof e === "string") {
      this.setState({
        answerDesc: e,
      });
    }
  };

  render() {
    return (
      <div className='question__page'>
        {this.state.question && <Question question={this.state.question}/>}
        <hr/>
        <h4>Answers</h4>
        {this.state.dbAnswers.map((answer) => <Answer answer={answer}
                                                        userName={this.props.user.userName}
                                                        key={answer.id}/>)}
        {this.state.answers.map((answer, index) => <Answer answer={answer}
                                                           userName={this.props.user.userName}
                                                           key={index}/>)}
        <hr/>
        <h4>Your Answer</h4>
        <Wysiwyg changeHandler={this.handleChange}/>
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