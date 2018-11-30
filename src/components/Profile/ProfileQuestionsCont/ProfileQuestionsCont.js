import React, { Component } from 'react'
import { connect } from 'react-redux';
import QuestionItem from "../../universal/QuestionItem/QuestionItem";

class ProfileQuestionContainer extends Component {
    render() {
        return (
            <div>
                {console.log(this.props.questions)}
                {this.props.questions.map((question, index)=> <QuestionItem key={index} title={question.title} description={question.description}
                                                                      answerCount={question.answerCount}
                                                                      rate={question.rate} userName={this.props.user.userName}
                                                                      skills={question.skills} date={question.date}/>)}
            </div>
        )
    }
}

//{this.props.questions.map((question)=> <QuestionItem title={question.title} description={question.description}
//                                                                      answerCount={question.answerCount}
//                                                                      rate={question.rate} userName={this.props.user.userName}
//                                                                      skills={question.skills} date={question.date}/>)}

//id: null,
//       userId: this.props.user.id,
//       title: title,
//       description: description,
//       rate: 0,
//       answerCount: 0,
//       date: Date.now(),
//       update: null,
//       skill: skills,
//       age: age,
//       gender: gender

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        questions: state.questionReducer.questions
    }
};
export default connect(mapStateToProps)(ProfileQuestionContainer);
