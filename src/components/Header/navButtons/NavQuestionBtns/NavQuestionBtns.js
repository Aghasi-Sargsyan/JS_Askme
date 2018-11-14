import React from 'react';
import profileImg from "../../../../assets/profileImg.png";
import "./NavQuestionBtns.scss";

const NavQuestionBtns = props => {
  return (
    <div className="navigation-items-q">
      <ul>
            <li>
              <a href="/">Question</a>
            </li>

            <li className="img-li">
              <a href="/">
                <img src={profileImg} alt="Profile Image" />
              </a>
            </li>

            <li>
                <a href="/">Ask a Question</a>
            </li>
      </ul>
    </div>
  )
}

export default NavQuestionBtns;