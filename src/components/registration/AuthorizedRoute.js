import React, { Component } from "react";
import { auth } from "firebase";
import { Route, Redirect } from "react-router-dom";

export default class AuthorizedRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: false,
      pending: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      this.setState({
        pending: false,
        authUser: !!user
      });
      // authUser
      //   ? this.setState({ authUser })
      //   : this.setState({ authUser: null });
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { authUser, pending } = this.state;
    return (
      <Route
        {...rest}
        render={renderProps => {
          if (pending) return null;
          return authUser ? (
            <Component {...renderProps} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: renderProps.location }
              }}
            />
          );
        }}
      />
    );
  }
}
