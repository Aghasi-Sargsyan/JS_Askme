import React, {Component} from 'react';
import {FaSistrix} from "react-icons/fa";
import Input from "../universal/Input/Input";
import "./SearchBox.scss";

export default class SearchBox extends Component {
    state = {
        value: ""
    }

    handleSearhChange = e => {
        this.setState({value: e.target.value})
    }

    render() {
        return (
            <div className="searchbox-container">
                <Input
                    valid
                    type="text"
                    placeholder="Search..."
                    onChange={this.handleSearhChange}/>

                <span className="input-group-btn">
          <button className="btn btn-default">
            <FaSistrix/>
          </button>
        </span>
            </div>
        )
    }
}
