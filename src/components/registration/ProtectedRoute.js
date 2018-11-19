import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { user } = this.props;
    console.log('sss', user);
    return (
        <Route
            { ...rest }
            render={props =>
                user ?
                    ( <Component {...props} /> )
                    :
                    ( <Redirect to="/signin"/> )
            } />
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(ProtectedRoute);
