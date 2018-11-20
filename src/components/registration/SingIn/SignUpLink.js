import {Link} from "react-router-dom";
import React from "react";

const SignUpLink = () => (
    <p className="singIn__message">
        Don't have an account? <Link to="/signup">Sign Up</Link>
    </p>
);

export default SignUpLink;