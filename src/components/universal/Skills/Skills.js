import React from 'react';

const Skills = props => {
    const { skills, h, s, isShowingMessage } = props;
    return (
        <ul className="skills">
            {
                (skills.length !== 0)
                    ?
                    skills.map((skill, index) =>
                        <li
                            key={index}
                            id={index}
                            style={{
                                width: `${skill.rate + 150}px`,
                                backgroundColor: `hsl(${h}, ${s}%, ${100 / (index + 3.5)}%)`
                            }}
                        >
                            <p>{skill.value} {skill.rate && <span>{skill.rate}</span>}</p>
                            <button id={index} onClick={props.deleteSkill}>x</button>
                        </li>
                    )
                    :
                    isShowingMessage &&
                    <p className="no-skill__message">Add your skills and be active</p>
            }
        </ul>
    );
}

export default Skills;