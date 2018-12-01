import React, {Component} from 'react'
import {connect} from 'react-redux';
import QuestionItem from '../../universal/QuestionItem/QuestionItem';
import {bindActionCreators} from "redux";
import {getAndDispatchUserQuestions} from "../../../redux/actions/questionActions";

class ProfileQuestionContainer extends Component {


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user.id !== this.props.user.id){
            this.props.getAndDispatchUserQuestions(this.props.user.id);
        }
    }

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
                        <div className='empty_div'/>
                    </div>
                </div>
                {this.props.questions.map((question) => <QuestionItem
                    key={question.id} id={question.id}
                    title={question.title}
                    description={question.description}
                    answerCount={question.answerCount}
                    rate={question.rate} userName={this.props.user.userName}
                    skills={question.skills} date={question.date}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        questions: state.questionReducer.questions
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getAndDispatchUserQuestions:  bindActionCreators(getAndDispatchUserQuestions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileQuestionContainer);
