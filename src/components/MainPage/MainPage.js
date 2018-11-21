import React, {Component} from 'react';
import Header from "../Header/Header";
import QuestionPage from "../QuestionPage/QuestionPage";
import {auth} from "firebase";
import paths from "../RegistrationPage/config/paths";
import {bindActionCreators} from "redux";
import {actionGetUserFromAuth, dispatchUserFromDb} from "../../redux/actions/userActions";
import connect from "react-redux/es/connect/connect";

class MainPage extends Component {


    componentDidMount() {
        console.log("MainPage");

        const {history} = this.props;
        auth().onAuthStateChanged(user => {
            if (user) {
                this.props.dispatchUserFromDB(user.uid);
                this.props.dispatchUserFromAuth(user);
            }
           else {
                history.push(`/`);
            }
        });
    }

    rend(){
        switch (this.props.match.path) {
            case paths.questionPage:
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
                </div>
            </div>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserFromDB: bindActionCreators(dispatchUserFromDb, dispatch),
        dispatchUserFromAuth: bindActionCreators(actionGetUserFromAuth, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(MainPage);
