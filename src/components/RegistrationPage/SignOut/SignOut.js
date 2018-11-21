import React from "react";
import {auth} from "firebase";
import {connect} from "react-redux";
import {actionRemoveUser} from "../../../redux/actions/userActions";
import {withRouter} from "react-router-dom";
import paths from "../../../roteConfig/paths";


function SignOutButton(props) {

    function logout() {
        auth().signOut()
            .then(() => {
                    localStorage.setItem("login", "false");
                    props.dispatch(actionRemoveUser);
                    props.history.push(paths.signIn)
                }
            );
    }


    return (
        <button onClick={logout}>Sign Out</button>
    );
}

export default withRouter(connect()(SignOutButton));
