import React, { Component } from 'react';
import './QuestionItem.scss';

export default class QuestionItem extends Component {
    render() {
        return (
            <div className='question-item-container'>
                <h3>Title 1</h3>
                <div className='question-skill'>
                    <span>Doctor</span>
                    <span>Driver</span>
                </div>
                <div className='question-desc'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorecontaining Lus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>
        )
    }
}