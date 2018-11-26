import React, { Component } from "react";
import { connect } from "react-redux";
import './QuestionsFilter.scss';

class QuestionsFilter extends Component {
    render() {
        const skills = this.props.dbUser && this.props.dbUser.skills.map((skill, index) => {
            return <li key={index}>{skill.value}</li>
        });
        return (
            <div className='am--questions-filter-container '>
                <ul className='am__flex am__flex_column am__align_start'>
                    <li>All</li>
                    <li className='am__flex am__flex_column am__align_start'>
                        Skill
                        <ul className='am__flex am__flex_column am__align_start am--questions-skills-menu'>
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