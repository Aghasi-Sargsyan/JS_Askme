import React, {Component} from 'react';
import "./SkillContainer.scss";
import Skill from "../universal/Skill/Skill";

export default class SkillContainer extends Component {

  render() {

    const {skills, deleteSkill, isSkillObj} = this.props;
    return (
      <>
        <ul className="skill-container">
          {skills.map(skill => isSkillObj
            ? <Skill key={skill.value} value={skill.value} rate={skill.rate} deleteSkill={deleteSkill}/>
            : <Skill key={skill} value={skill} deleteSkill={deleteSkill}/>)}
        </ul>
        {!skills.length && isSkillObj && <p className="no-skill__message">Add your skills and be active</p>}
      </>
    );
  }
}