import React, { Component } from "react";
import Wysiwyg from '../universal/Wysiwyg/Wysiwyg';
import FireManager from "../../firebase/FireManager";
import { connect } from "react-redux";
import './AskQuestionPage.scss';
import { bindActionCreators } from "redux";
import { getAndDispatchDbUser } from "../../redux/actions/userActions";
import male from "../../assets/icons/male.png";
import female from "../../assets/icons/female.png";
import gender from '../../assets/icons/gender.png';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import SkillContainer from '../SkillContainer/SkillContainer';

class AskQuestionPage extends Component {
  state = {
    title: "",
    description: "",
    skills: [],
    skillDesc: '',
    gender: 'all',
    ageRange: { min: 15, max: 30 },
    age: [],
    isTyping: false,
  };

  handleChange = e => {
    if (typeof e === "string") {
      this.setState({
        description: e
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });

      if (e.target.id === 'skillDesc') {
        this.setState({
          isTyping: !!e.target.value
        })
      }
    }
  };

  handleAgeRange = (min, max) => {
    const ageArray = [];
    for (let i = min; i <= max; i++) {
      ageArray.push(i);
    }
    this.setState({age: ageArray});
  };

  handleRadioButton = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  addSkill = () => {
    const { skills, skillDesc } = this.state;
    const skillList = skills.concat(skillDesc);
    this.setState({
      skills: skillList,
      skillDesc: "",
      gender: ""
    })
  };

  deleteSkill = (e) => {
    const array = [...this.state.skills];
    const index = e.target.id;
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ skills: array });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { title, description, skills, age, gender } = this.state;
    const question = {
      id: null,
      userId: this.props.user.id,
      title: title,
      description: description,
      rate: 0,
      answerCount: 0,
      date: Date.now(),
      update: null,
      skills: skills,
      skills_insensitive: skills.map(skill => skill.toUpperCase()),
      age: age,
      gender: gender
    };
    const questionId = FireManager.addQuestion(question, this.props.user.id);
  };

  render() {
    const { isTyping } = this.state;
    return (
      <div className='ask_question'>
        <div className='flex'>
          <input
            className='ask_question_title'
            placeholder="What's your question"
            onChange={this.handleChange}
            id="title"
            value={this.state.title}
          />
        </div>
        <div>
          <Wysiwyg changeHandler={this.handleChange} />
        </div>
        <div className='age__slider flex'>
          <div className='age__slider_age'>Age</div>
          <InputRange
            disabled={isTyping}
            draggableTrack
            maxValue={70}
            minValue={10}
            onChange={value => this.setState({ ageRange: value })}
            onChangeComplete={value => this.handleAgeRange(value.min, value.max)}
            value={this.state.ageRange} />
        </div>
        <div className='ask_question_gender'>
          <span className='pad_right_20'>Gender</span>
          <label aria-disabled={isTyping}>
            <input
              type="radio"
              name="gender"
              value="all"
              defaultChecked="true"
              disabled={isTyping}
              onChange={this.handleRadioButton}
            />
            <img src={gender} alt="all" />
          </label>
          <label aria-disabled={isTyping}>
            <input
              type="radio"
              name="gender"
              value="male"
              disabled={isTyping}
              onChange={this.handleRadioButton}
            />
            <img src={male} alt="male" />
          </label>
          <label aria-disabled={isTyping}>
            <input
              type="radio"
              name="gender"
              value="female"
              disabled={isTyping}
              onChange={this.handleRadioButton}
            />
            <img className='female' src={female} alt="female" />
          </label>
        </div>
        <div>
          <label>
            Skills
            <input
              value={this.state.skillDesc}
              onChange={this.handleChange}
              id="skillDesc"
              className='mar_left_20'
            />
          </label>
          <button type='button' onClick={this.addSkill} className='ask_question_skill_add'>
            +
          </button>
          <ul className='skill_list'>
            <SkillContainer isShowingMessage={false} deleteSkill={this.deleteSkill} skills={this.state.skills} />
          </ul>
        </div>
        <button className='ask_question_submit' onClick={this.onSubmit}>Post Your Question</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getAndDispatchDbUser: bindActionCreators(getAndDispatchDbUser, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestionPage);
