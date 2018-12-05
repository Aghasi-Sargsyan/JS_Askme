import React, {Component} from 'react';
import Avatar from '../Avatar/Avatar';
import './QuestionItem.scss';
import {Link} from "react-router-dom";
import FireManager from "../../../firebase/FireManager";

export default class QuestionItem extends Component {

    state = {
        userName: ""
    };

    componentDidMount() {
        FireManager.getUser(this.props.question.userId).then(user => {
            this.setState({
                userName: user.userName
            })
        })
    }

    render() {
        const descriptionArr = [];
        descriptionArr.push(this.props.description);
        const {question} = this.props;
        const formattedDate = new Date(question.date).toLocaleString();

        return (
            <Link to={`/item/${question.id}`} className='question_item_container'>
                <div className='question_item_content'>
                    <div className='flex justify_between'>
                        <div className='question_item_title'>
                            {question.title}
                        </div>
                        <div className='question_item_buttons'>
                            {!this.props.profileQuestion &&
                            <>
                                <button>-</button>
                                <button>x</button>
                            </>
                            }
                        </div>
                    </div>

                    <div className='question_item_desc flex align_center'>
                        <div className='flex_grow'>
                            <div dangerouslySetInnerHTML={{__html: descriptionArr.join('')}}>

                            </div>
                        </div>
                        <div className='flex align_center'>
                            <div className='flex question_item_scores'>
                                <div>{question.rate}</div>
                                <div>{question.answerCount}</div>
                            </div>
                            <div className='flex question_item_user align_center'>
                                <div className='question_item_avatar'>
                                    <Avatar/>
                                </div>
                                <div className='question_item_writer'>
                                    <div>{this.state.userName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='question_item_footer flex justify_between'>
                        <div className='question_item_skill'>
                            {question.skills.map(skill => <span key={skill}>{skill}</span>)}
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
/*{this.props.skills.map((skill)=> <span>{skill}</span>)}*/
