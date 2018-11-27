import React, { Component } from "react";
import { connect } from "react-redux";
import './QuestionsFilter.scss';

class QuestionsFilter extends Component {
    render() {
        const skills = this.props.dbUser && this.props.dbUser.skills.map((skill, index) => {
            return <li key={index}>{skill.value}</li>
        });
        return (
            <div className='questions-filter-container '>
                <ul className='questions-filter flex flex_column align_start'>
                    <li>All</li>
                    <li className='flex flex_column align_start'>
                        Skill
                        <ul className='flex flex_column align_start questions-skills-menu'>
                            {skills}
                        </ul>
                    </li>
                    <li>Age</li>
                    <li>Gender</li>
                    <li>Answer Later</li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dbUser: state.userReducer.dbUser,
    };
}

export default connect(mapStateToProps)(QuestionsFilter);