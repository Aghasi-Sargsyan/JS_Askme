import React, { Component } from "react";
import { auth } from "firebase";
import { Route, Redirect } from "react-router-dom";

export default class ProtectedRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }

  componentWillUnmount() {
    // this.setState({
    //   user: null
    // })
    // auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.setState({ user: null });
    //   }
    // })
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { user } = this.state;
    return (
      <Route
        {...rest}
        render={renderProps => {
          // if (pending) return null;
          return user ? (
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
