import React, { Component } from "react";
import Avatar from '../../universal/Avatar/Avatar';
import RateCounter from '../../universal/RateCounter/RateCounter';
import './Question.scss';
import FireManager from "../../../firebase/FireManager";

class Question extends Component {

    state = {
        questionUserName: "",
    };

    componentDidMount() {
        FireManager.getUser(this.props.question.userId).then(questionUser =>
            this.setState({
                questionUserName: questionUser.userName,
            })
        )
    }

    render() {
        const {question} = this.props;
        return (
            <div className='item__question__page'>
                <h2 className='item__question__title'>
                    {question.title}
                </h2>
                <hr />
                <div className='flex align_center'>
                    <div>
                        <RateCounter />
                    </div>
                    <div className='item__question__avatar flex align_center flex_col'>
                        <Avatar />
                        <span className='font_s ellipsis'>{this.state.questionUserName}</span>
                    </div>
                    <div className='pad_right_20 pad_left_20'>
                        <div className='item__question__desc'>
                            {question.description}
                        </div>
                        <div className='item__question__skill'>
                            {question.skills.map(skill => <span key={skill}>{skill}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question
