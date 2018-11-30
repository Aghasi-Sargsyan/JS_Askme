import React from "react";
import SignOutButton from "../../registration/SignOut/SignOut";
import { Link } from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";
import "./InfoDrop.scss";

const InfoDrop = ({ close }) => {
  return (
    <div className="info-drop tar">
      <Link to={routePaths.profilePage} onClick={close} className="info__drop__a">
        Profile
      </Link>
      <SignOutButton />
    </div>
  );
};

export default InfoDrop;
