import React from "react";
import RegistrationContainer from "./RegistrationContainer/RegistrationContainer";
import connect from "react-redux/es/connect/connect";
import {auth} from "firebase";


class RegistrationPage extends React.Component {

    componentDidMount() {
        const {history} = this.props;
        auth().onAuthStateChanged(function (user) {
            if (user) {
                history.push(`/main/user/${user.uid}/questions`)
            } else {
                // No user is signed in.
            }
        });
    }


    render() {
        return (
            <RegistrationContainer match={this.props.match} history={this.props.history}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.userReducer.authUser
    }
}


export default connect(mapStateToProps)(RegistrationPage);