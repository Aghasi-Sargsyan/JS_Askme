import React from 'react';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import "./Skills.scss";

const Skills = props => {
  const { skills, h, s } = props;
  return (
    <ul className="skills">
          {skills.map((skill, index) => 
            <li
              key={skill.type}
              style={{ width: `${skill.rate + 150}px`, backgroundColor: `hsl(${h}, ${s}%, ${100 / (index + 3.5) }%)` }}
            >
              <p>{skill.type}<span>{skill.rate}</span></p>
            </li>
          )}
    </ul>
  );
}

export default Skills;