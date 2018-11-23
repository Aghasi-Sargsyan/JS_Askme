import React from "react";
import SignOutButton from "../../RegistrationPage/SignOut/SignOut";
import {Link} from "react-router-dom";
import "./InfoDrop.scss";
import routePaths from "../../../constKeys/routePaths";


const InfoDrop = () => {
  return (
    <div className="info-drop">
      <Link to={routePaths.profilePage}>
        <button>Profile</button>
      </Link>
      <SignOutButton />
    </div>
  );
};

export default InfoDrop;
