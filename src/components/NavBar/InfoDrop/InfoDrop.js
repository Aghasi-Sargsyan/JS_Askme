import React from "react";
import SignOutButton from "../../registration/SignOut/SignOut";
import {Link} from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";
import "./InfoDrop.scss";
import {connect} from "react-redux";

const InfoDrop = ({user, close}) => {
    return (
        <div className="info-drop tar pad">
            <Link to={routePaths.profilePage} onClick={close} className="info__drop__a">
                Profile
            </Link>
            <Link to={routePaths.settingPage + user.id} onClick={close} className="info__drop__a">
                Settings
            </Link>
            <SignOutButton/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
};
export default connect(mapStateToProps)(InfoDrop);
