import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
    render() {
        const question = this.props.question && this.props.question[5];
        // const descArr = [];
        // descArr.push(this.props.question && question.description);


        console.log(this.props.question && question)
        return (
            <div>
                <h2 className='question__title'>{this.props.question && question.title}</h2>
                {/* <div className="question__decription" dangerouslySetInnerHTML={{ __html: descArr.join('') }}></div> */}
                {/* <ul className='question__skills'>{skillList}</ul> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question: state.questionReducer.question
    }
}
export default connect(mapStateToProps)(Question)
