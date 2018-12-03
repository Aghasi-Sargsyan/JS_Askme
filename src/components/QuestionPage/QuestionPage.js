import React, {Component} from "react";
import QuestionsFilter from './QuestionsFilter/QuestionsFilter';
import QuestionsCont from './QuestionsCont/QuestionsCont';
import FireManager from "../../firebase/FireManager";
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
        FireManager.getQuestions(null, skill.value));
    });

    const p2 = FireManager.getQuestions(null, null, this.props.user.age);

    const p3 = FireManager.getQuestions(null, null, null, this.props.user.gender);
    const p4 = FireManager.getQuestions(null, null, null, "all");

    promiseArray.push(p2, p3, p4);

    return Promise.all(promiseArray).then(questionMatrix => {
      const allQuestions = [].concat.apply([], questionMatrix);
      return Object.values(allQuestions.reduce((acc, question) => Object.assign(acc, {[question.id]: question}),{}))
    })
    //TODO delete own questions from array
    //TODO gender and age together
  };

  componentDidMount() {
    if (this.props.user.id) {
      this.getQuestions().then(formattedQuestions => {
        this.setState({
          allQuestions: formattedQuestions,
          filteredQuestions: formattedQuestions
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user.id) {
      this.getQuestions().then(formattedQuestions => {
        if (JSON.stringify(prevState.allQuestions) !== JSON.stringify(formattedQuestions)) {
          this.setState({
            allQuestions: formattedQuestions,
            filteredQuestions: formattedQuestions
          });
        }
      });
    }
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