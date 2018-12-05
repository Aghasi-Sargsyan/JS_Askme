import React, {Component} from 'react'
import {connect} from 'react-redux';
import QuestionItem from '../../universal/QuestionItem/QuestionItem';
import FireManager, {dbPaths} from "../../../firebase/FireManager";

class ProfileQuestionContainer extends Component {

    state = {
        askedQuestions: [],
        answeredQuestions: []
    };

    componentDidMount() {
        const {user} = this.props;
        user.id && this.getUserQuestions();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user.id !== this.props.user.id) {
            this.getUserQuestions()
        }
    }

    getUserQuestions = () => {
        const p1 = FireManager.queryData({
            collectionPath: dbPaths.collections.QUESTIONS,
            fieldPath: dbPaths.USER_ID,
            operator: "==",
            value: this.props.user.id
        });

        const p2 = FireManager.queryData(
            {
                collectionPath: dbPaths.collections.QUESTIONS,
                fieldPath: dbPaths.REPLIED_USERS,
                operator: "array-contains",
                value: this.props.user.id
            });

        Promise.all([p1, p2])
            .then(questionMatrix => this.setState({
                askedQuestions: questionMatrix[0],
                answeredQuestions: questionMatrix[1]
            }));
    };

    render() {
        const questions = this.props.askedQuestions
            ? this.state.askedQuestions
            : this.state.answeredQuestions;
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
                {questions.map((question) => <QuestionItem
                    key={question.id} question={question} profileQuestion={true}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
};

export default connect(mapStateToProps)(ProfileQuestionContainer);
