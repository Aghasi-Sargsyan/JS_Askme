import React, {Component} from 'react'
import {connect} from 'react-redux';
import QuestionItem from '../../universal/QuestionItem/QuestionItem';
import FireManager, {questionsFieldPaths} from "../../../firebase/FireManager";

class ProfileQuestionContainer extends Component {

  state = {
    askedQuestions: [],
    answeredQuestions: []
  };

  componentDidMount() {
    const {user} = this.props;
    user.id && this.getUserQuestions();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user.id !== this.props.user.id) {
      this.getUserQuestions()
    }
  }

  getUserQuestions = () => {
    FireManager.queryData({
      collectionPath: "questions",
      fieldPath: questionsFieldPaths.USER_ID,
      operator: "==",
      value: this.props.user.id
    }).then(questions => {
      this.setState(
        {askedQuestions: questions}
      );
    })
  };

  render() {
    return (
      <div>
        <div className='question_item_header flex align_center'>
          <div className='flex_grow'>
            <div>Type</div>
          </div>
          <div className='flex question__item_header_txt'>
            <div>Votes</div>
            <div>Answers</div>
            <div className='empty_div'/>
          </div>
        </div>
        {this.state.askedQuestions.map((question) => <QuestionItem
          key={question.id} question={question}/>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  }
};

export default connect(mapStateToProps)(ProfileQuestionContainer);
