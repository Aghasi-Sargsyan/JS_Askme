import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import {connect} from "react-redux";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import paths from "./roteConfig/paths";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={RegistrationPage}/>
                    <Route path={paths.signIn} component={RegistrationPage}/>
                    <Route path={paths.signUp} component={RegistrationPage}/>
                    <Route path={paths.questionPage} component={MainPage}/>
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
