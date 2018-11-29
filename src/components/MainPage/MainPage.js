import React, {Component} from "react";
import routePaths from "../../constKeys/routePaths";
import connect from "react-redux/es/connect/connect";
import Header from "../Header/Header";
import QuestionPage from "../QuestionPage/QuestionPage";
import AskQuestionPage from "../AskQuestionPage/AskQuestionPage";
import AfterRegPopup from "../Profile/AfterRegPopup/AfterRegPopup";
import Profile from "../Profile/Profile";
import {Route, withRouter} from "react-router-dom";
import Page404 from "../Page404/Page404";

class MainPage extends Component {
  constructor(props) {
    super(props);

    console.log("main created")
  }

  componentDidMount() {
    this.redirect();
  }

  redirect = () => {
    const {history, location} = this.props;
    switch (location.pathname) {
      case "/":
      case routePaths.signUp:
      case routePaths.signIn:
        history.push(routePaths.questionPage);
        break;
      default:
    }
    console.log(this.props.history.location);
  };

  popUp() {
    const user = this.props.user;
    if (user) {
      return user.isNewUser && <AfterRegPopup/>
    }
  }

  render() {
    return (
      <div className="Main">
        <Header/>
        <div>
          <Route path={routePaths.questionPage} component={QuestionPage}/>
          <Route path={routePaths.profilePage} component={Profile}/>
          <Route path={routePaths.askQuestionPage} component={AskQuestionPage}/>
          {this.popUp()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  }
}

export default withRouter(connect(mapStateToProps)(MainPage));
