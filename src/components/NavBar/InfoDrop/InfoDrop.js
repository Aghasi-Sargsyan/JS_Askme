import React from "react";
import SignOutButton from "../../registration/SignOut/SignOut";
import { Link } from "react-router-dom";
import "./InfoDrop.scss";
import routePaths from "../../../constKeys/routePaths";


const InfoDrop = ({ close }) => {
  return (
    <div className="info-drop">
      <Link to={routePaths.profilePage}>
        <button onClick={close}>Profile</button>
      </Link>
      <SignOutButton />
    </div>
  );
};

export default InfoDrop;
