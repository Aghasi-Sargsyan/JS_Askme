import React, { Component } from 'react';
import './QuestionsCont.scss';
import QuestionItem from './QuestionItem/QuestionItem';

export default class QuestionsCont extends Component {
    render() {
        return (
            <div className='am--questions-container'>
                <QuestionItem />
                <QuestionItem />
            </div>
        )
    }
}