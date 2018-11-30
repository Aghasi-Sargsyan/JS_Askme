import React from "react";
import SignOutButton from "../../registration/SignOut/SignOut";
import { Link } from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";
import "./InfoDrop.scss";

const InfoDrop = ({ close }) => {
  return (
    <div className="info-drop flex flex_column tar justify_around">
      <Link to={routePaths.profilePage}>
        <button onClick={close}>Profile</button>
      </Link>
      <SignOutButton />
    </div>
  );
};

export default InfoDrop;
