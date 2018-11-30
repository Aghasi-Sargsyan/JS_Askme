import React, { Component } from 'react';
import QuestionItem from '../../universal/QuestionItem/QuestionItem';
import './QuestionsCont.scss';

export default class QuestionsCont extends Component {
    render() {
        return (
            <div className='questions_container'>
                <div className='question_header flex align_center'>
                    <div className='flex_grow'>
                        <div>Type</div>
                    </div>
                    <div className='flex'>
                        <div>Vote</div>
                        <div>Answer</div>
                    </div>
                </div>
                <QuestionItem />
                <QuestionItem />
            </div>
        )
    }
}