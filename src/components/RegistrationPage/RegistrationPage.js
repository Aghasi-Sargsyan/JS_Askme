import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import SignIn from './RegistrationContainer/SignIn/SignIn';
import SignUp from './RegistrationContainer/SignUp/SignUp';

// import RegistrationContainer from './RegistrationContainer/ReistrationContainer';

class RegistrationPage extends Component {
    render() {
        return (
            <div>
                <Link to='/signin'>SignIn</Link>
                <Link to='/signup'>SignUp</Link>

                {/* <RegistrationContainer /> */}

                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
            </div>
        );
    }
}

export default RegistrationPage;