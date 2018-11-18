import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { auth } from "firebase";
import initFirebase from "./config/fireConfig";

import SignIn from "./components/registration/SingIn/SignIn";
import SignUp from "./components/registration/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import QuestionPage from "./components/QuestionPage/QuestionPage";

import AuthorizedRoute from "./components/registration/AuthorizedRoute";
import RegContainer from "./components/registration/RegContainer";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <RegContainer />
          <hr />
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/questions" component={QuestionPage} />
        </div>
      </Router>
    );
  }
}

export default App;
