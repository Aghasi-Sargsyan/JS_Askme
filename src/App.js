import React, {Component} from "react";
import MainPage from "./components/MainPage/MainPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import {bindActionCreators} from "redux";
import {actionLogin, actionLogout, getAndDispatchDbUser} from "./redux/actions/userActions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {auth} from "firebase";


class App extends Component {

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getAndDispatchDbUser(user.uid);
        this.props.dispatchLogin();
      } else {
        this.props.dispatchLogout();
      }
    })
  }

  rend() {
    if (this.props.isLoggedIn && this.props.user) {
      return <MainPage/>;
    }
    if (this.props.isLoggedIn === false){
      return <RegistrationPage/>
    }
  }

  render() {
    return (
      <div>
        {this.rend()}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    getAndDispatchDbUser: bindActionCreators(getAndDispatchDbUser, dispatch),
    dispatchLogin: () => dispatch(actionLogin),
    dispatchLogout: () => dispatch(actionLogout),
  };
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

