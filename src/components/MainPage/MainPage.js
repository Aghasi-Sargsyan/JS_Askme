import React, {Component} from 'react';
import Header from "../Header/Header";
import QuestionPage from "../QuestionPage/QuestionPage";
import {auth} from "firebase";
import rotePaths from "../../constKeys/rotePaths";
import {bindActionCreators} from "redux";
import {actionGetUserFromAuth, dispatchUserFromDb} from "../../redux/actions/userActions";
import connect from "react-redux/es/connect/connect";
import localKeys from "../../constKeys/localKeys";
import AfterRegPopup from "../Profile/AfterRegPopup/AfterRegPopup";

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

    rend(){
        const {match} = this.props;

        switch (match.path) {
            case rotePaths.questionPage:
                return <QuestionPage/>;
            default:

        }
    }

    render() {

           return (
            <div className="Main">
                <Header/>
                <div>
                    {this.rend()}
                    {(localStorage.getItem(localKeys.isNewUser) === "true") && <AfterRegPopup/>}
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
