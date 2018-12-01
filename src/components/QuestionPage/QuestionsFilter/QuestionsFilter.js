import React, { Component } from "react";
import { connect } from "react-redux";
import './QuestionsFilter.scss';

class QuestionsFilter extends Component {
    render() {
        const skills = this.props.user && this.props.user.skills.map((skill, index) => {
            return <li key={index}>{skill.value}</li>
        });

        return (
            <div className='questions-filter-container '>
                <ul className='flex flex_column align_start'>
                    <li>All</li>
                    <li>Age</li>
                    <li>Gender</li>
                    <li className='flex flex_column align_start'>
                        Skill
                        <ul className='flex wrap align_start questions-skills-menu'>
                            {skills}
                        </ul>
                    </li>
                    <li>Answer Later</li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer,
    };
}

export default connect(mapStateToProps)(QuestionsFilter);