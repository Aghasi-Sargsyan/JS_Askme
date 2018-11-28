import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import routePaths from "./constKeys/routePaths";
import Page404 from "./components/Page404/Page404";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={RegistrationPage} />
                        <Route path={routePaths.signIn} component={RegistrationPage} />
                        <Route path={routePaths.signUp} component={RegistrationPage} />
                        <Route path={routePaths.questionPage} component={MainPage} />
                        <Route path={routePaths.profilePage} component={MainPage} />
                        <Route path={routePaths.askQuestionPage} component={MainPage} />
                        <Route path={routePaths.itemPage} component={MainPage} />
                        <Route component={Page404} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
