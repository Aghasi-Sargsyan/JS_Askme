import React, {Component} from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";
import Main from "./components/Main/Main";
import RegContainer from "./components/registration/RegContainer";
import {actionGetUserFromAuth, dispatchUserFromDb} from "./redux/actions/userActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    {this.props.authUser ? <Main/> :  <RegContainer/>}
                </div>
            </Router>
        );
    }
}


function mapStateToProps(state) {
    return {
        authUser: state.userReducer.authUser
    }
}



export default connect(mapStateToProps)(App);
