import React from 'react';
import avatar from "../../../assets/profileImg.png";
import "./Avatar.scss";

const Avatar = props => <img src={avatar} alt="avatar" onClick={props.clicked} />;

export default Avatar;