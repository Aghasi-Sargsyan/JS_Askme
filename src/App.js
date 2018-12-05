import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {actionLogin, actionLogout, getAndDispatchDbUser} from "./redux/actions/userActions";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {auth} from "firebase";
import routePaths from "./constKeys/routePaths";
import SignInForm from "./components/registration/SignInForm/SignInForm";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import Header from "./components/Header/Header";
import SignUpForm from "./components/registration/SignUpForm/SignUpForm";
import Profile from "./components/Profile/Profile";
import AskQuestionPage from "./components/AskQuestionPage/AskQuestionPage";
import Page404 from "./components/Page404/Page404";
import AfterRegPopup from "./components/Profile/AfterRegPopup/AfterRegPopup";
import ItemPage from "./components/ItemPage/ItemPage";
import SettingPage from "./components/SettingPage/SettingPage";


class App extends Component {

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if (user) {
                this.props.getAndDispatchDbUser(user.uid);
                this.props.dispatchLogin();
            } else {
                this.props.dispatchLogout();
            }
        })
    }

    rend() {
        const {user} = this.props;
        if (user.isLoggedIn !== null) {
            const signIn = <Redirect to={routePaths.signIn}/>;
            const questionPage = <Redirect to={routePaths.questionPage}/>;

            return (
                <Switch>
                    <Route exact path="/" render={() => (
                        user.isLoggedIn ? (questionPage) : (<SignInForm/>))}/>

                    <Route exact path={routePaths.signIn} render={() => (
                        user.isLoggedIn ? (questionPage) : (<SignInForm/>))}/>

                    <Route exact path={routePaths.signUp} render={() => (
                        user.isLoggedIn ? (questionPage) : (<SignUpForm/>))}/>

                    <Route exact path={routePaths.questionPage} render={() => (
                        user.isLoggedIn ? (<QuestionPage/>) : (signIn))}/>

                    <Route exact path={routePaths.profilePage} render={() => (
                        user.isLoggedIn ? (<Profile/>) : (signIn))}/>

                    <Route exact path={routePaths.askQuestionPage} render={() => (
                        user.isLoggedIn ? (<AskQuestionPage/>) : (signIn))}/>

                    <Route exact path={"/item/:id"} component={ItemPage}/>
                    <Route exact path={"/settings/:id"} component={SettingPage}/>

                    <Route component={Page404}/>
                </Switch>
            )
        }
    }


    afterRegPopup() {
        const {user} = this.props;

        if (user) {
            return user.isNewUser && <AfterRegPopup/>;
        }

    }

    render() {
        return (
            <div>
                {this.props.user.isLoggedIn && <Header/>}
                {this.rend()}
                {this.afterRegPopup()}
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getAndDispatchDbUser: bindActionCreators(getAndDispatchDbUser, dispatch),
        dispatchLogin: () => dispatch(actionLogin),
        dispatchLogout: () => dispatch(actionLogout),
    };
}

function mapStateToProps(state) {
    return {
        user: state.userReducer,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

