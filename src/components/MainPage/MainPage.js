import React, {Component} from "react";
import {auth} from "firebase";
import routePaths from "../../constKeys/routePaths";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {getAndDispatchDbUser} from "../../redux/actions/userActions";
import { getQuestionsFromDb } from "../../redux/actions/questionActions";
import localKeys from "../../constKeys/localKeys";
import Header from "../Header/Header";
import QuestionPage from "../QuestionPage/QuestionPage";
import AskQuestionPage from "../AskQuestionPage/AskQuestionPage";
import AfterRegPopup from "../Profile/AfterRegPopup/AfterRegPopup";
import Profile from "../Profile/Profile";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStoreFull: !!props.dbUser
    };

    if (localStorage.getItem(localKeys.isUserLoggedIn) === "false") {
      props.history.push(routePaths.signIn);
    }
  }

  componentDidMount() {
    if (!this.state.isStoreFull) {
      auth().onAuthStateChanged(user => {
        if (user) {
          this.props.getAndDispatchDbUser(user.uid, this.setStore);
          this.props.getQuestionsFromDb(user.uid);
          localStorage.setItem(localKeys.isUserLoggedIn, "true");
        }
      })
    }
  }

  setStore = () => {
    this.setState({isStoreFull: true})
  };

  rend() {
    const {match} = this.props;

    if (this.state.isStoreFull) {
      switch (match.path) {
        case routePaths.questionPage:
          return <QuestionPage/>;
        case routePaths.profilePage:
          return <Profile/>;
        case routePaths.askQuestionPage:
          return <AskQuestionPage/>;
        default:
      }
    }
  }

  popUp() {
    if (this.state.isStoreFull) {
      const {isNewUser} = this.props.dbUser;
      if (isNewUser) {
        return <AfterRegPopup/>
      }
    }
  }

  render() {
      return (
      <div className="Main">
        <Header/>
        <div>
          {this.rend()}
          {this.popUp()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dbUser: state.userReducer.dbUser,
    questions: state.questionReducer.question,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAndDispatchDbUser: bindActionCreators(getAndDispatchDbUser, dispatch),
    getQuestionsFromDb: bindActionCreators(getQuestionsFromDb, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
