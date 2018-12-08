import React, { Component } from "react";
import Avatar from '../../universal/Avatar/Avatar';
import RateCounter from '../../universal/RateCounter/RateCounter';
import './Question.scss';
import FireManager from "../../../firebase/FireManager";

class Question extends Component {

    state = {
        userName: "",
        photoUrl: ""
    };

    componentDidMount() {
        FireManager.getUser(this.props.question.userId).then(user =>
            this.setState({
                userName: user.userName,
                photoUrl: user.photoUrl
            })
        )
    }

    render() {
        const descriptionArr = [];
        descriptionArr.push(this.props.question.description);

        return (
            <div className='item__question__page'>
                <h2 className='item__question__title'>
                    {this.props.question.title}
                </h2>
                <hr />
                <div className='flex align_center'>
                    <div>
                        <RateCounter />
                    </div>
                    <div className='item__question__avatar flex align_center flex_col'>
                        <Avatar src={this.state.photoUrl} />
                        <span className='font_s ellipsis'>{this.state.userName}</span>
                    </div>
                    <div className='pad_right_20 pad_left_20'>
                        <div className='item__question__desc' dangerouslySetInnerHTML={{ __html: descriptionArr.join('') }}></div>
                        <div className='item__question__skill'>
                            {this.props.question.skills.map(skill => <span key={skill}>{skill}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question
