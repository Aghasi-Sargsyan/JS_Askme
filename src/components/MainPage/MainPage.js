import React, {Component} from 'react';
import Header from "../Header/Header";
import QuestionPage from "../QuestionPage/QuestionPage";
import {auth} from "firebase";
import paths from "../RegistrationPage/config/paths";

export default class MainPage extends Component {


    componentDidMount() {
        const {history} = this.props;
        auth().onAuthStateChanged(function (user) {
            if (!user) {
                history.push(`/`)
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
