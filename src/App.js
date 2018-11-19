import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/registration/SingIn/SignIn";
import SignUp from "./components/registration/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import Main from "./components/Main/Main";
// import ProtectedRoute from "./components/registration/ProtectedRoute";
import RegContainer from "./components/registration/RegContainer";
import {auth} from "firebase";
import {getUserFromDb} from "./redux/actions/userActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class App extends Component {
    constructor(props) {
      super(props);

        auth().onAuthStateChanged(user => {
                if (user) {
                    this.props.getUserFromDB(user.uid);
                } else {
                    console.log("index user logged out", user);
                }
            }
        );
    }

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
            <Route exact path="/questions" component={QuestionPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserFromDB: bindActionCreators(getUserFromDb, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(App);
