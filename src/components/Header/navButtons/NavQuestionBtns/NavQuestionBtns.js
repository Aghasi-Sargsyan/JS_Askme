import React from 'react';
import profileImg from "../../../../assets/profileImg.png";
import { Link } from "react-router-dom";

import "./NavQuestionBtns.scss";

const NavQuestionBtns = props => {
  return (
    <div className="navigation-items-q">
      <ul>
        <li>
          <Link to="/questions">Questions</Link>
        </li>

        <li className="img-li">
          <Link to="/profile">
            <img src={profileImg} alt="Profile Image" />
          </Link>
        </li>

        <li>
          <Link to="/askQuestion">Ask a Question</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavQuestionBtns;