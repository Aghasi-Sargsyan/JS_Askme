import React, { Component } from "react";
import Wysiwyg from '../universal/Wysiwyg/Wysiwyg';
import FireManager from "../../firebase/FireManager";
import { connect } from "react-redux";
import './AskQuestionPage.scss';
import { bindActionCreators } from "redux";
import { getAndDispatchDbUser } from "../../redux/actions/userActions";
import { actionAddQuestion } from "../../redux/actions/questionActions";
import male from "../../assets/icons/male.png";
import female from "../../assets/icons/female.png";
import gender from '../../assets/icons/gender.png';

class AskQuestionPage extends Component {
  state = {
    title: "",
    description: "",
    skills: [],
    skillDesc: '',
    age: '',
    gender: '',
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
      skillDesc: '',

    })
  };

  skillsRender = () => {
    return this.state.skills.map((skill, index) => (
      <li key={index}>{skill}</li>
    ));
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
      skill: skills,
      age: age,
      gender: gender
    };
    FireManager.addQuestion(question, this.props.user.id);
    this.props.dispatchQuestion(question)
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
        <div>
          <label>
            Age
            <input
              className='mar_left_20'
              type='number'
              value={this.state.age}
              disabled={isTyping}
              onChange={this.handleChange}
              id="age"
            />
          </label>
        </div>
        <div className='ask_question_gender'>
          <span className='pad_right_20'>Gender</span>
          <label>
            <input
              type="radio"
              name="gender"
              value="All"
              defaultChecked="true"
              disabled={isTyping}
              onChange={this.handleRadioButton}
            />
            <img src={gender} alt="all" />
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              disabled={isTyping}
              onChange={this.handleRadioButton}
            />
            <img src={male} alt="male" />
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              disabled={isTyping}
              onChange={this.handleRadioButton}
            />
            <img src={female} alt="female" />
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
          <ul> {this.skillsRender()} </ul>
        </div>
        <button className='ask_question_submit' onClick={this.onSubmit}>Post Your Question</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getAndDispatchDbUser: bindActionCreators(getAndDispatchDbUser, dispatch),
    dispatchQuestion: bindActionCreators(actionAddQuestion, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestionPage);
