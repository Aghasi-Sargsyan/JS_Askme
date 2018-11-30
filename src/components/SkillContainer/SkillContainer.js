import React, { Component } from 'react';
import Skills from '../universal/Skills/Skills';
import "./SkillContainer.scss";

export default class SkillContainer extends Component {
    state = {
        collapse: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ collapse: false })
        }, 500);
    }

    render() {
        const { collapse } = this.state;
        const { skills, saturation } = this.props;
        return (
            <div className={`skill-container ${collapse ? "collapse" : ""}`}>
                <label className="skill__label">Skills</label>
                <Skills skills={skills} s={saturation} />
            </div>
        );
    }
}
