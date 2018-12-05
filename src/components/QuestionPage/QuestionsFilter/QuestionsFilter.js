import React, {Component} from "react";
import './QuestionsFilter.scss';

export default class QuestionsFilter extends Component {
    render() {
        return (
            <div className='questions-filter-container '>
                <ul className='flex flex_column align_start'>
                    <li>
                        <button id={"all"} onClick={this.props.filterClickHandler}>
                            All
                        </button>
                    </li>
                    <li>
                        <button id={"age"} onClick={this.props.filterClickHandler}>
                            Age
                        </button>
                    </li>
                    <li>
                        <button id={"gender"} onClick={this.props.filterClickHandler}>
                            Gender
                        </button>
                    </li>
                    <li className='flex flex_column align_start'>
                        Skill
                        <ul className='flex wrap align_start questions-skills-menu'>
                            {this.props.skills.map((skill, index) =>
                                <li key={index}>
                                    <button onClick={this.props.filterClickHandler}
                                            id={skill.value}>
                                        {skill.value}
                                    </button>
                                </li>)}
                        </ul>
                    </li>
                    <li>Answer Later</li>
                </ul>
            </div>
        )
    }
}