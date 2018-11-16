import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import initFirebase from './config/fireConfig';

import Header from './components/Header/Header';
import SignIn from "./components/registration/SingIn/SignIn";
import SignUp from "./components/registration/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import QuestionPage from './components/QuestionPage/QuestionPage';
import AskQuestion from './components/AskQuestion/AskQuestion';
import AuthorizedRoute from './components/registration/AuthorizedRoute';

class App extends Component {
  constructor(props) {
    super(props);

    // initFirebase();
  }


  render() {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
          <AuthorizedRoute exact path="/questions" component={QuestionPage} />
          <AuthorizedRoute exact path="/askQuestion" component={AskQuestion} />
          <AuthorizedRoute exact path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;
