import React from "react";
import {auth} from "firebase";
import {connect} from "react-redux";
import {actionRemoveUser} from "../../../redux/actions/userActions";
import {withRouter} from "react-router-dom";
import routePaths from "../../../constKeys/routePaths";
import localKeys from "../../../constKeys/localKeys";


function SignOutButton(props) {

    function logout() {
        auth().signOut()
            .then(() => {
                    localStorage.setItem(localKeys.isUserLoggedIn, "false");
                    props.dispatch(actionRemoveUser);
                    props.history.push(routePaths.signIn)
                }
            );
    }


    return (
        <button className="sign-out" onClick={logout}>Sign Out</button>
    );
}

export default withRouter(connect()(SignOutButton));
