import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import routePaths from '../../../constKeys/routePaths';
import Avatar from '../../universal/Avatar/Avatar';
import InfoDrop from "../InfoDrop/InfoDrop";
import "./NavBarItems.scss";

class NavBarItems extends Component {
    state = {
        infoOpen: false
    };

    componentDidMount() {
        this.isMount = true;
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillMount() {
        if (this.isMount) {
            this.props.history.listen(this.handleInfoDrop);
        }
    }

    componentWillUnmount() {
        this.isMount = false;
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleInfoDrop = e => {
        this.setState(prevState => ({
            infoOpen: !prevState.infoOpen
        }));
    };

    handleClickOutside = event => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                infoOpen: false
            });
        }
    };

    render() {
        return (
            <ul>
                <li>
                    <NavLink to={routePaths.questionPage}>
                        Questions For You
                    </NavLink>
                </li>

                <li className="img-li" ref={(node) => this.wrapperRef = node}>
                    <Avatar clicked={this.handleInfoDrop} />
                    {this.state.infoOpen && <InfoDrop close={this.handleInfoDrop} />}
                </li>

                <li>
                    <NavLink to={routePaths.askQuestionPage}>
                        Ask a Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to={routePaths.itemPage}>
                        Item
                    </NavLink>
                </li>
            </ul>
        )
    }
}

export default NavBarItems;