import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import routePaths from "./constKeys/routePaths";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={RegistrationPage} />
                    <Route path={routePaths.signIn} component={RegistrationPage} />
                    <Route path={routePaths.signUp} component={RegistrationPage} />
                    <Route path={routePaths.questionPage} component={MainPage} />
                    <Route path={routePaths.profilePage} component={MainPage} />
                    <Route path={routePaths.askQuestionPage} component={MainPage} />
                </div>
            </Router>
        );
    }
}

export default App;
