import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar';
import './QuestionItem.scss';

export default class QuestionItem extends Component {
    render() {
        return (
            <div className='question__item_container'>
                <div className='question__item_header flex justify_between'>
                    <h3 className='question__title'>Update query with Join SQL Server</h3>
                    <div>
                        <button>-</button>
                        <button>+</button>
                    </div>
                </div>
                <div className='question__item_content flex justify_between'>
                    <div className='question__item_center'>
                        <div className='question__desc'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorecontaining Lus PageMaker including versions of Lorem Ipsum.
                        </div>
                    </div>
                    <div className='question__item_right'>
                        <div className='question__votes flex flex_col tac'>
                            <span>3</span>
                        </div>
                        <div className='question__answers flex flex_col tac'>
                            <span>20</span>
                        </div>
                    </div>
                    <div className='question__item_left'>
                        <Avatar />
                    </div>
                </div>
                <div className='question__item_bottom flex justify_between'>
                    <div className='question__skill'>
                        <span>Doctor</span>
                        <span>Driver</span>
                    </div>
                    <div className='question__date'>
                        <span>20/12/18</span>
                    </div>
                </div>
            </div>
        )
    }
}