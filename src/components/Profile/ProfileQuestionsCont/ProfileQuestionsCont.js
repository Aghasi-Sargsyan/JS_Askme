import React, { Component } from 'react'
import { connect } from 'react-redux';
import QuestionItem from '../../universal/QuestionItem/QuestionItem';

class ProfileQuestionContainer extends Component {      
    render() {
        return (
            <div>
                <div className='question_item_header flex align_center'>
                    <div className='flex_grow'>
                        <div>Type</div>
                    </div>
                    <div className='flex question__item_header_txt'>
                        <div>Votes</div>
                        <div>Answers</div>
                        <div className='empty_div'></div>
                    </div>
                </div>
                <QuestionItem />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};
export default connect(mapStateToProps)(ProfileQuestionContainer);
