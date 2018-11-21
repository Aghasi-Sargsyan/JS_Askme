import {Link} from "react-router-dom";
import React from "react";
import paths from "../config/paths";

const SignUpLink = () => (
    <p className="singIn__message">
        Don't have an account? <Link to={paths.signUp}>Sign Up</Link>
    </p>
);

export default SignUpLink;