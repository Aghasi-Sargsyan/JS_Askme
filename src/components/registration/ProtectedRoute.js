import React, {Component} from "react";
import {Redirect, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
  }
// componentDidMount () {
//     if(!this.props.authUser) {
//         this.props.history.push('/signin')
//     }
// }

componentWillUpdate (nextProp) {
      if(!nextProp.authUser) {
         nextProp.history.push('/signin')
      }
}

  render() {
    const { component: Component, ...rest } = this.props;
    const { authUser } = this.props;
    console.log('protected', authUser);
    return (
        <Route
            {...rest}
            render={props =>
                authUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />


    );
  }
}

function mapStateToProps(state) {
    return {
        authUser: state.userReducer.authUser
    }
}

export default withRouter(connect(mapStateToProps)(ProtectedRoute));
