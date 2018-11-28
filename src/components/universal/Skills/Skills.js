import React from 'react';
import "./Skills.scss";

const Skills = props => {
  const {skills, h, s} = props;
  return (
    <ul className="skills">
      {skills.map((skill, index) =>
        <li
          key={skill.value}
          style={{width: `${skill.rate + 150}px`, backgroundColor: `hsl(${h}, ${s}%, ${100 / (index + 3.5)}%)`}}
        >
          <p>{skill.value}<span>{skill.rate}</span></p>
        </li>
      )}
    </ul>
  );
}

export default Skills;