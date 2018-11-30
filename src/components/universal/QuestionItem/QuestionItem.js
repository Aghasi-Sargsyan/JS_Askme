import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar';
import './QuestionItem.scss';
import {Link} from "react-router-dom";

export default class QuestionItem extends Component {



    render() {
        const descriptionArr = [];
        descriptionArr.push(this.props.description);
        const {date} = this.props;
        const formattedDate = new Date(date).toLocaleString();

        return (
            <Link to={`/item/${this.props.id}`} className='question_item_container' onClick={this.handleClick}>
                <div className='question_item_content'>
                    <div className='flex justify_between'>
                        <div className='question_item_title'>
                            {this.props.title}
                    </div>
                        <div className='question_item_buttons'>
                            <button>-</button>
                            <button>x</button>
                        </div>
                    </div>

                    <div className='question_item_desc flex align_center'>
                        <div className='flex_grow' dangerouslySetInnerHTML={{__html:descriptionArr.join('')}}>
                        </div>
                        <div className='flex align_center'>
                            <div className='flex question_item_scores'>
                                <div>{this.props.rate}</div>
                                <div>{this.props.answerCount}</div>
                            </div>
                            <div className='flex question_item_user align_center'>
                                <div className='question_item_avatar'>
                                    <Avatar />
                                </div>
                                <div className='question_item_writer'>
                                    <div>{this.props.userName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='question_item_footer flex justify_between'>
                        <div className='question_item_skill'>

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
