import React from 'react';
import "./Skills.scss";

const Skills = props => {
    const {skills, h, s} = props;
    return (
        <ul className="skills">

            {
                (skills.length !== 0)
                    ?
                    skills.map((skill, index) =>
                        <li
                            key={skill.value}
                            id={index}
                            style={{
                                width: `${skill.rate + 150}px`,
                                backgroundColor: `hsl(${h}, ${s}%, ${100 / (index + 3.5)}%)`
                            }}
                        >
                            <p>{skill.value}<span>{skill.rate}</span></p>
                            <button id={index} onClick={props.deleteSkill}>x</button>
                        </li>
                    )
                    :
                    <p className="no-skill__message">Add your skills and be active</p>
            }
        </ul>
    );
}

export default Skills;