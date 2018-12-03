import React, {Component} from "react";
import QuestionsFilter from './QuestionsFilter/QuestionsFilter';
import QuestionsCont from './QuestionsCont/QuestionsCont';
import FireManager, {questionsFieldPaths} from "../../firebase/FireManager";
import connect from "react-redux/es/connect/connect";

class QuestionPage extends Component {

  state = {
    allQuestions: [],
    filteredQuestions: []
  };

  getQuestions = () => {
    const promiseArray = [];
    this.props.user.skills.forEach(skill => {
      promiseArray.push(
        FireManager.getQuestions({
          fieldPath: questionsFieldPaths.SKILLS,
          operator: "array-contains",
          value: skill.value
        }));
    });

    const p2 = FireManager.getQuestions({
      fieldPath: questionsFieldPaths.AGE,
      operator: "array-contains",
      value: this.props.user.age
    });

    const p3 = FireManager.getQuestions({
      fieldPath: questionsFieldPaths.GENDER,
      operator: "==",
      value: this.props.user.gender
    });

    const p4 = FireManager.getQuestions({
      fieldPath: questionsFieldPaths.GENDER,
      operator: "==",
      value: "all"
    });

    promiseArray.push(p2, p3, p4);

    return Promise.all(promiseArray).then(questionMatrix => {
      const allQuestions = [].concat.apply([], questionMatrix);
      return Object.values(allQuestions.reduce((acc, question) => Object.assign(acc, {[question.id]: question}), {}))
    })
    //TODO delete own questions from array
    //TODO gender and age together
  };

  componentDidMount() {

    this.getQuestions().then(formattedQuestions => {
      this.setState({
        allQuestions: formattedQuestions,
        filteredQuestions: formattedQuestions
      });
    });

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    this.getQuestions().then(formattedQuestions => {
      if (JSON.stringify(prevState.allQuestions) !== JSON.stringify(formattedQuestions)) {
        this.setState({
          allQuestions: formattedQuestions,
          filteredQuestions: formattedQuestions
        });
      }
    });

  }

  questionFilter = (type) => {
    const {allQuestions} = this.state;
    let filteredQuestions = [];
    switch (type) {
      case "all":
        filteredQuestions = allQuestions;
        break;
      case "age":
        filteredQuestions = allQuestions.filter(question => question.age[0] === this.props.user.age);
        break;
      case "gender":
        filteredQuestions = allQuestions.filter(question => question.gender);
        break;
      //by skills
      default:
        filteredQuestions = allQuestions.filter((question) => {
          if (question.skills.find((skill) => skill.toUpperCase() === type.toUpperCase())) {
            return question;
          }
        });
    }
    this.setState({
      ...this.state,
      filteredQuestions
    });
  };

  handleFilterClick = (e) => {
    const type = e.target.id;
    this.questionFilter(type);
  };

  render() {
    return (
      <div>
        <div className='flex'>
          <QuestionsFilter skills={this.props.user.skills}
                           filterClickHandler={this.handleFilterClick}/>
          <QuestionsCont filteredQuestions={this.state.filteredQuestions}/>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  }
};

export default connect(mapStateToProps)(QuestionPage);