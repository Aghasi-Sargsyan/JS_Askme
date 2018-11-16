import React, { Component } from "react";
import { auth } from "firebase";
import { Route, Redirect } from "react-router-dom";

export default class AuthorizedRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            pending: true,
            loggedIn: undefined
        };
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        auth().onAuthStateChanged(user => {
            this.setState({
                pending: false,
                loggedIn: !!user
            });
        });
    }

    render() {
        const { component: Component, ...rest } = this.props;
        const { loggedIn, pending } = this.state;
        return (
            <Route {...rest} render={renderProps => {
                if (pending) return null;
                return loggedIn
                    ? <Component {...renderProps} />
                    : <Redirect to={{
                        pathname: '/signIn',
                        state: { from: renderProps.location }
                    }} />
            }} />
        );
    }

}