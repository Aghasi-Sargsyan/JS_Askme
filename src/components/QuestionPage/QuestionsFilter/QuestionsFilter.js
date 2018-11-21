import React, { Component } from "react";
import './QuestionsFilter.scss';

export default class QuestionsFilter extends Component {
    render() {
        return (
            <div className='am--questions-filter-container '>
                <ul className='am--flex am--flex-column am--align-start'>
                    <li>All</li>
                    <li className='am-flex am--flex-column am--align-start'>
                        Skill
                        <ul className='am-flex am--flex-column am--align-start'>
                            <li>Doctor</li>
                            <li>Programmer</li>
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