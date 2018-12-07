import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar';
import defaultAvatar from '../../../assets/profileImg.png';
import { Link } from "react-router-dom";
import FireManager from "../../../firebase/FireManager";
import './QuestionItem.scss';

export default class QuestionItem extends Component {

    state = {
        userName: "",
        photoUrl: ""
    };

    componentDidMount() {
        FireManager.getUser(this.props.question.userId).then(user => {
            this.setState({
                userName: user.userName,
                photoUrl: user.photoUrl
            })
        });
    }

    render() {
        const descriptionArr = [];
        descriptionArr.push(this.props.question.description);
        const { question } = this.props;
        const formattedDate = new Date(question.date).toLocaleString();
        const userMinAge = question.age[0];
        const userMaxAge = question.age[question.age.length - 1];

        return (
            <Link to={`/item/${question.id}`} className='question_item_container'>
                <div className='question_item_content'>
                    <div className='flex justify_between'>
                        <div className='question_item_title'>
                            {question.title}
                        </div>
                        {/* <div className='question_item_buttons'>
                            {!this.props.profileQuestion &&
                                <>
                                    <button>-</button>
                                    <button>x</button>
                                </>
                            }
                        </div> */}
                    </div>

                    <div className='question_item_desc flex align_center'>
                        <div className='flex_grow question_item_wysiwyg'>
                            <div dangerouslySetInnerHTML={{ __html: descriptionArr.join('') }}></div>
                        </div>
                        <div className='flex align_center'>
                            <div className='flex question_item_scores'>
                                <div>{question.rate}</div>
                                <div>{question.answerCount}</div>
                            </div>
                            <div className='flex question_item_user align_center'>
                                <div className='question_item_avatar'>
                                    <Avatar src={this.state.photoUrl ? this.state.photoUrl : defaultAvatar} />
                                </div>
                                <div className='question_item_writer ellipsis'>
                                    <div className='ellipsis'>{this.state.userName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='question_item_footer flex justify_between align_center'>
                        {question.skills.length !== 0
                            && <div className='question_item_skill'>
                                {question.skills.map(skill => <span key={skill}>{skill}</span>)}
                            </div>}
                        <div className='flex'>
                            {userMinAge && userMaxAge && <div className='question_item_age'>
                                <span>{userMinAge + " - " + userMaxAge}</span>
                            </div>}
                            {question.gender && <div className='question_item_gender'>
                                <span>{question.gender}</span>
                            </div>}
                        </div>
                        <div className='question_item_date'>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}