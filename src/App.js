import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main/Main";
// import { actionGetUserFromAuth, dispatchUserFromDb } from "./redux/actions/userActions";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import ProtectedRoute from './components/universal/ProtectedRoute/ProtectedRoute';
import { Switch } from "react-router-dom";
// import SignIn from "./components/RegistrationPage/RegistrationContainer/SignIn/SignIn";
// import SignUp from "./components/RegistrationPage/RegistrationContainer/SignUp/SignUp";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import Profile from './components/Profile/Profile';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <RegistrationPage />
                    <Profile />

                    {/* <Switch>
                        <ProtectedRoute exact path="/questions" component={QuestionPage} />
                        <ProtectedRoute exact path="/profile" component={Profile} />
                        <ProtectedRoute exact path="/" component={Main} />
                    </Switch> */}
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.userReducer.authUser
    }
}

export default connect(mapStateToProps)(App);
