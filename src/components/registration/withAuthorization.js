import React, { Component } from "react";
import { auth } from "firebase";
import { Route, Redirect } from "react-router-dom";

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends Component {
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push("/signin");
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <Component {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
};

export default withAuthorization;
