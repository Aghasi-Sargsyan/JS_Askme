import React, {Component} from 'react';
import QuestionItem from '../../universal/QuestionItem/QuestionItem';
import './QuestionsCont.scss';
import {connect} from "react-redux";
import FireManager from "../../../firebase/FireManager";

class QuestionsCont extends Component {

  state = {
    questions: [],
    filter: {
      FILTER_TYPES: {
        ALL: "ALL",
        AGE: "AGE",
        GENDER: "GENDER",
        SKILL: [],
        LATER: "LATER"
      },
      filteredArrays: {
        byAge: [],
        byGender: [],
        bySkill: [],
        later: []
      }
    }
  };

  getQuestions = () => {
    const promiseArray = [];
    this.props.user.skills.forEach(skill => {
      promiseArray.push(
        FireManager.getQuestions(null, skill.value,)
          .then(skillQuestions => skillQuestions)
      )
    });

    const p2 = FireManager.getQuestions(null, null, 2018 - this.props.user.age)
      .then(ageQuestions => ageQuestions);

    const p3 = FireManager.getQuestions(null, null, null, this.props.user.gender);
    const p4 = FireManager.getQuestions(null, null, null, "all");

    promiseArray.push(p2, p3, p4);

    return Promise.all(promiseArray).then(questionMatrix => {
      const allQuestions = [].concat.apply([], questionMatrix);
      return Object.values(allQuestions.reduce((acc, question) => Object.assign(acc, {[question.id]: question}), {}))
    })
    //TODO delete own questions from array
  };

  filterQuestions = (type) => {
    const {FILTER_TYPES} = this.state.filter;
    const {questions} = this.state;

    switch (type) {
      case FILTER_TYPES.ALL:
        return this.state.questions;
      case FILTER_TYPES.AGE:
        this.setState({
          ...this.state,
          filter: {
            ...this.state.filter,
            filteredArrays: {
              ...this.state.filter.filteredArrays,
              byAge: questions.filter(question => question.age)
            }
          }
        });
        break;
      default:
    }
  };


  componentDidUpdate(prevProps, prevState, snapshot) {
    this.getQuestions().then(allQuestions => {
      if (JSON.stringify(prevState.questions)!== JSON.stringify(allQuestions)) {
        this.setState({
          ...this.state,
          questions: allQuestions
        });
      }
    });

  }

  onclick = () => {
    this.filterQuestions(this.state.filter.FILTER_TYPES.AGE)
  };

  render() {
    return (
      <div className='questions_container'>
        <div className='question_item_header flex align_center'>
          <div className='flex_grow'>
            <div onClick={this.onclick}>Type</div>
          </div>
          <div className='flex question__item_header_txt'>
            <div>Votes</div>
            <div>Answers</div>
            <div className='empty_div'></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  }
};

export default connect(mapStateToProps)(QuestionsCont)