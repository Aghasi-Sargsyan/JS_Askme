import React, { Component } from "react";
// import Avatar from '../../universal/Avatar/Avatar';
import Avatar from '@material-ui/core/Avatar';
import FireManager from "../../../firebase/FireManager";
import defaultAvatar from '../../../assets/profileImg.png';
import Divider from '@material-ui/core/Divider';
import './Answer.scss';

class Answer extends Component {
    state = {
        userName: "",
        photoUrl: ""
    };

    componentDidMount() {
        !this.props.userName && FireManager.getUser(this.props.answer.userId).then(user => {
            this.setState({
                userName: user.userName,
                photoUrl: user.photoUrl
            });
        })
    }

    render() {
        const descriptionArr = [];
        descriptionArr.push(this.props.answer.description);

        return (
            <div className='answer__page'>
                <div className='flex align_center padb_20 '>
                    <div className='answer__avatar flex align_center flex_col'>
                        <Avatar src={this.state.photoUrl ? this.state.photoUrl : defaultAvatar} />
                        <span className='font_s ellipsis'>{this.props.userName || this.state.userName}</span>
                    </div>
                    <div className='answer__desc wysiwyg flex_grow pad_right_20 pad_left_20' dangerouslySetInnerHTML={{ __html: descriptionArr.join('') }}></div>
                </div>
                <Divider light />

            </div>
        )
    }
}

export default Answer
