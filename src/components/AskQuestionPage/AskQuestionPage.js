import React, { Component } from "react";
import Wysiwyg from '../universal/Wysiwyg/Wysiwyg';
import Input from "../universal/Input/Input";
import FireManager from "../../firebase/FireManager";
import { connect } from "react-redux";

class AskQuestionPage extends Component {
  state = {
    title: "",
    description: "",
    skills: "",
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

  onSubmit = e => {
    e.preventDefault();

    const { title, description } = this.state;
    console.log(this.props.dbUser.id);
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
        skill: [],
        age: null,
        gender: null
      },
      this.props.dbUser.id
    );
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
        <div className="am--flex">
          <Wysiwyg changeHandler={this.handleChange} />
        </div>
        <div>
          <Input
            label="Skills"
            value={this.state.skills}
            changeHandler={this.handleChange}
            id="skills"
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
}

export default connect(mapStateToProps)(AskQuestionPage);
