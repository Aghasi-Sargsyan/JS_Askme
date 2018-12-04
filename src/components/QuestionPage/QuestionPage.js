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
    this.props.user.skills_insensitive.forEach(skill => {
      promiseArray.push(
        FireManager.getQuestions({
          fieldPath: questionsFieldPaths.SKILLS,
          operator: "array-contains",
          value: skill
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

      const allQuestions = [].concat(...questionMatrix);
      const otherUserQuestions = allQuestions.filter(question => question.userId !== this.props.user.id);

      return otherUserQuestions.reduce((newQuestions, question) => {
        let exists = !!newQuestions.find(q => q.id === question.id);
        if (!exists) {
          newQuestions.push(question);
        }
        return newQuestions;
      }, []);
    })
  };

  componentDidMount() {

    FireManager.getGlobalSkills().then(g => console.log(g));

    this.getQuestions().then(formattedQuestions => {
      console.log(formattedQuestions);
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
        filteredQuestions = allQuestions.filter(question => question.age.includes(this.props.user.age));
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