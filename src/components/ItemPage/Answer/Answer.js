import React, { Component } from "react";
import Avatar from '../../universal/Avatar/Avatar';
import RateCounter from '../../universal/RateCounter/RateCounter';
import './Answer.scss';

class Answer extends Component {
    render() {
        return (
            <div className='answer__page'>
                <div className='flex'>
                    <div className='answer__avatar'>
                        <Avatar />
                    </div>
                    <div className='answer__desc'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                    <div>
                        <RateCounter />
                    </div>
                </div>

            </div>
        )
    }
}

export default Answer
