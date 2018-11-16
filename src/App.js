import React, { Component } from "react";
import {auth} from "firebase";
import SignIn from "./components/registration/SingIn/SignIn";
import SignUp from "./components/registration/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import { HashRouter as Router, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);



    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            component={this.state.user ? Profile : SignIn}
          />
          <Route
            exact
            path="/signUp"
            component={this.state.user ? Profile : SignUp}
          />
        </div>
      </Router>
    );
  }
}

export default App;
