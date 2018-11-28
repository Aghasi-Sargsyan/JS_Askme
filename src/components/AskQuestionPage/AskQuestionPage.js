import React, { Component } from "react";
import Wysiwyg from '../universal/Wysiwyg/Wysiwyg';
import Input from "../universal/Input/Input";
import FireManager from "../../firebase/FireManager";
import { connect } from "react-redux";

class AskQuestionPage extends Component {
  state = {
    title: "",
    description: "",
    skills: [],
    skillDesc: '',
    age: '',
    gender: ''
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
    }
  };

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
    return (
      <div>
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
          <button
            type='button'
            onClick={this.addSkill}
          >
            Add Skill
          </button>
          <ul>
            {this.skillsRender()}
          </ul>
        </div>
        <div>
          <Input
            type='number'
            label="Age"
            value={this.state.age}
            changeHandler={this.handleChange}
            id="age"
          />
        </div>
        <div>
          <Input
            label="Gender"
            value={this.state.gender}
            changeHandler={this.handleChange}
            id="gender"
          />
        </div>
        <button onClick={this.onSubmit}>Post Your Question</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dbUser: state.userReducer.dbUser
  };
};

export default connect(mapStateToProps)(AskQuestionPage);
