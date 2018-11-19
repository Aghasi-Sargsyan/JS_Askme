import React, { Component } from 'react';
import Header from "../Header/Header";
import QuestionPage from '../QuestionPage/QuestionPage';

export default class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Header />
                <QuestionPage />
            </div>
        )
    }
}
