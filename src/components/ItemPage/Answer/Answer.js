import React, {Component} from "react";
import Avatar from '../../universal/Avatar/Avatar';
import RateCounter from '../../universal/RateCounter/RateCounter';
import './Answer.scss';
import FireManager from "../../../firebase/FireManager";

class Answer extends Component {

    state = {
        userName: ""
    };

    componentDidMount() {
        !this.props.userName && FireManager.getUser(this.props.answer.userId).then(user => {
                this.setState({
                    userName: user.userName
                });
            }
        )
    }

    render() {
        return (
            <div className='answer__page'>
                <div className='flex'>
                    <div className='answer__avatar flex align_center flex_col'>
                        <Avatar/>
                        <span className='font_s'>{this.props.userName || this.state.userName}</span>
                    </div>
                    <div className='answer__desc pad_right_20 pad_left_20'>
                        {this.props.answer.description}
                    </div>
                    <div>
                        <RateCounter/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Answer
