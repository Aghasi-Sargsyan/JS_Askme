import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import { connect } from "react-redux";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import rotePaths from "./constKeys/rotePaths";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={RegistrationPage} />
                    <Route path={rotePaths.signIn} component={RegistrationPage} />
                    <Route path={rotePaths.signUp} component={RegistrationPage} />
                    <Route path={rotePaths.questionPage} component={MainPage} />
                    <Route path={rotePaths.profilePage} component={MainPage} />
                    <Route path={rotePaths.askQuestionPage} component={MainPage} />
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
