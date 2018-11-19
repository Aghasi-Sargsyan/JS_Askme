import React, { Component } from "react";
import SignOutButton from "../registration/SignOut/SignOut";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUserFromDb} from "../../redux/actions/userActions";
import {auth} from "firebase";

class QuestionPage extends Component {

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if (user) {
                this.props.getUser(user.uid);
            } else {
                console.error("user not found")
            }
        })
    }

    render() {
        console.log(this.props.user);
        return (
            <div>
                <h1>Welcome to Questions Page</h1>
                <SignOutButton/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: bindActionCreators(getUserFromDb, dispatch)

        /**mapping to props without bindActionCreators*/
        //getUser: id => dispatch(getUserFromDb(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);