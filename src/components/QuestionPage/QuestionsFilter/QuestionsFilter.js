import React, { Component } from "react";
import { connect } from "react-redux";

import './QuestionsFilter.scss';

class QuestionsFilter extends Component {
    constructor() {
        super();

        // this.state = {
        //     showMenu: false,
        // }
    }

    // showMenu = () => {
    //     this.setState({
    //         showMenu: !this.state.showMenu,
    //     });
    // }

    render() {
        const skills = this.props.dbUser && this.props.dbUser.skills.map((skill, index) => {
            return <li key={index}>{skill.value}</li>
        });
        console.log('dbuser', this.props.dbUser)

        return (
            <div className='am--questions-filter-container '>
                <ul className='am--flex am--flex-column am--align-start'>
                    <li>All</li>
                    <li className='am-flex am--flex-column am--align-start' onClick={this.showMenu}>
                        Skill
                        {/* {
                            this.state.showMenu ? (
                                <ul className='am-flex am--flex-column am--align-start am--questions-skills-menu'>
                                    {skills}
                                </ul>
                            ) : (null)
                        } */}

                        <ul className='am-flex am--flex-column am--align-start am--questions-skills-menu'>
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