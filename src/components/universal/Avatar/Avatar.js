import React, { Component } from "react";
import "./Avatar.scss";

class Avatar extends Component {
    render() {
        return (
            <div>
                <img onClick={this.props.isClickable && this.props.onClick} src={this.props.src} alt="Avatar" />
            </div>
        );
    }
}

export default Avatar;