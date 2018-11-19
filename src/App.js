import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/registration/SingIn/SignIn";
import SignUp from "./components/registration/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import Main from "./components/Main/Main";
import ProtectedRoute from "./components/registration/ProtectedRoute";
import RegContainer from "./components/registration/RegContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <RegContainer />
          <hr />
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/profile" component={Profile} />
          <Switch>
            <ProtectedRoute exact path="/questions" component={QuestionPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
