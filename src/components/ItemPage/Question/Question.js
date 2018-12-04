import React, { Component } from "react";
import Avatar from '../../universal/Avatar/Avatar';
import RateCounter from '../../universal/RateCounter/RateCounter';
import './Question.scss';
import { connect } from "react-redux";

class Question extends Component {
    render() {
        const descriptionArr = [];
        descriptionArr.push(this.props.question.description);

        // const skills = this.props.question.skills.map((skill, index) => {
        //     return <span key={index}>{skill}</span>
        // });
        return (
            <div className='item__question__page'>
                <h2 className='item__question__title'>
                    {/* {this.props.question.title} */}
                    Title
                </h2>
                <hr />
                <div className='flex align_center'>
                    <div className='item__question__avatar flex align_center flex_col'>
                        <Avatar />
                        <span className='font_s ellipsis'>Name</span>
                        {/* {this.props.user.userName} */}
                    </div>
                    <div className='pad_right_20 pad_left_20'>
                        <div className='item__question__desc'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>
                        {/* <div className='item__question__desc' dangerouslySetInnerHTML={{ __html: descriptionArr.join('') }}></div> */}
                        <div className='item__question__skill'>
                            <span>skill1</span>
                            <span>skil2</span>
                            {/* {skills} */}
                        </div>
                    </div>
                    <div>
                        <RateCounter />
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questionReducer
    }
};
export default connect(mapStateToProps)(Question)
