// import React, { Component } from "react";
// import { connect } from "react-redux";

// class Question extends Component {
//     render() {
//         const question = this.props.question && this.props.question[29];
//         const descArr = [];
//         descArr.push(this.props.question && question.description);

//         // const skillList = this.props.question && this.props.question.skill.map((skill, index) => {
//         //     // console.log(this.props.question && question.skill)
//         //     return <li key={index}>{skill}</li>
//         // })
//         console.log(this.props.question && this.props.question)
//         return (
//             <div>
//                 <div className='question__title'>{this.props.question && question.title}</div>
//                 <div className="question__decription" dangerouslySetInnerHTML={{ __html: descArr.join('') }}></div>
//                 {/* <ul className='question__skills'>{skillList}</ul> */}

//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         question: state.questionReducer.question
//     }
// }
// export default connect(mapStateToProps)(Question)
