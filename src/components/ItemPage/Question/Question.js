import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
    render() {
        const question = this.props.questions && this.props.questions[5];
        // const descArr = [];
        // descArr.push(this.props.questions && questions.description);


        console.log(this.props.questions && question)
        return (
            <div>
                <h2 className='question__title'>{this.props.questions && question.title}</h2>
                {/* <div className="question__decription" dangerouslySetInnerHTML={{ __html: descArr.join('') }}></div> */}
                {/* <ul className='question__skills'>{skillList}</ul> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questionReducer.questions
    }
}
export default connect(mapStateToProps)(Question)
