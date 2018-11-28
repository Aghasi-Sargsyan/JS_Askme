import React, { Component } from "react";
import Wysiwyg from '../universal/Wysiwyg/Wysiwyg';
import Input from "../universal/Input/Input";
import FireManager from "../../firebase/FireManager";
import { connect } from "react-redux";
import './AskQuestionPage.scss';

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
  }

  addSkill = () => {
    const { skills, skillDesc } = this.state
    const skilList = skills.concat(skillDesc);
    this.setState({
      skills: skilList,
      skillDesc: '',

    })
  }

  skillsRender = () => {
    return this.state.skills.map((skill, index) => (
      <li key={index}>{skill}</li>
    ));
  }

  onSubmit = e => {
    e.preventDefault();
    const { title, description, skills, age, gender } = this.state;
    FireManager.addQuestion(
      {
        id: null,
        userId: this.props.dbUser.id,
        title: title,
        description: description,
        rate: 0,
        answerCount: 0,
        date: Date.now(),
        update: null,
        skill: skills,
        age: age,
        gender: gender
      },
      this.props.dbUser.id
    );

    this.setState({
      title: "",
      description: "",
      skills: [],
      skillDesc: '',
      age: '',
      gender: ''
    })
  };

  render() {
    const { isTyping } = this.state;
    return (
      <div className='ask_question'>
        <h1>Ask a question</h1>
        <div>
          <Input
            label="Title"
            changeHandler={this.handleChange}
            id="title"
            value={this.state.title}
          />
        </div>
        <div className="am__flex">
          <Wysiwyg changeHandler={this.handleChange} />
        </div>
        <div className='am__flex'>
          <Input
            label="Skills"
            value={this.state.skillDesc}
            changeHandler={this.handleChange}
            id="skillDesc"
          />
          <button type='button' onClick={this.addSkill}>
            Add Skill
          </button>
          <ul> {this.skillsRender()} </ul>
        </div>
        <div>
          <label>
            Age
            <input
              type='number'
              label="Age"
              value={this.state.age}
              disabled={isTyping}
              onChange={this.handleChange}
              id="age"
            />
          </label>
        </div>
        <div>
          <label>
            All
            <input
              type="radio"
              name="gender"
              value="All"
              defaultChecked="true"
              disabled={isTyping}
              onChange={this.handleRadioButton}
            />
          </label>
          <label>
            Male
            <input
              type="radio"
              name="gender"
              value="Male"
              disabled={isTyping}
              onChange={this.handleRadioButton}
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              name="gender"
              value="Female"
              disabled={isTyping}
              onChange={this.handleRadioButton}
            />
          </label>
        </div>
        <button onClick={this.onSubmit}>Post Your Question</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dbUser: state.userReducer.dbUser,
  };
};

export default connect(mapStateToProps)(AskQuestionPage);
