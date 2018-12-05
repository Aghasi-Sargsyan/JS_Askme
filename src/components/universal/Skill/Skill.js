import React from 'react';

const Skill = props => {
    const {value, rate} = props;

    return (
        <li id={value}>
            <p>{value} {rate && <span>{rate}</span>}</p>
            <button id={value} onClick={props.deleteSkill}>x</button>
        </li>
    );
};

export default Skill;