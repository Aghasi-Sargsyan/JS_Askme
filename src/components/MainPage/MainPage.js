import React, { Component } from 'react';
import Header from "../Header/Header";
import QuestionPage from "../QuestionPage/QuestionPage";
import { auth } from "firebase";
import rotePaths from "../../constKeys/rotePaths";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { actionGetUserFromAuth, dispatchUserFromDb } from "../../redux/actions/userActions";
import localKeys from "../../constKeys/localKeys";
import Header from "../Header/Header";
import QuestionPage from "../QuestionPage/QuestionPage";
import AskQuestionPage from '../AskQuestionPage/AskQuestionPage';
import AfterRegPopup from "../Profile/AfterRegPopup/AfterRegPopup";
import Profile from '../Profile/Profile';

class MainPage extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem(localKeys.isUserLoggedIn) === "false") {
            props.history.push(rotePaths.signIn);
        }
    }


    componentDidMount() {

        auth().onAuthStateChanged(user => {
            if (user) {
                this.props.dispatchUserFromDB(user.uid);
                this.props.dispatchUserFromAuth(user);
                localStorage.setItem(localKeys.isUserLoggedIn, "true")
            }
        });
    }

    rend() {
        const { match } = this.props;

        switch (match.path) {
            case rotePaths.questionPage:
                return <QuestionPage />;
            case rotePaths.profilePage:
                return <Profile />;
            case rotePaths.askQuestionPage:
                return <AskQuestionPage />;
            default:
        }
    }

    render() {

        return (
            <div className="Main">
                <Header />
                <div>
                    {this.rend()}
                    {(localStorage.getItem(localKeys.isNewUser) === "true") && <AfterRegPopup />}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserFromDB: bindActionCreators(dispatchUserFromDb, dispatch),
        dispatchUserFromAuth: bindActionCreators(actionGetUserFromAuth, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(MainPage);
