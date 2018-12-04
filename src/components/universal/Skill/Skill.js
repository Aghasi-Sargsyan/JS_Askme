import React from 'react';
import './Skill.scss';

const Skill = props => {
  const { value, rate } = props;

  return (
    <li id={value}>
      <p>{value} </p>
      <button id={value} onClick={props.deleteSkill}>x</button>
      {/* {rate && <span>{rate}</span>} */}
      <span>{rate}</span>
    </li>
  );
};

export default Skill;

