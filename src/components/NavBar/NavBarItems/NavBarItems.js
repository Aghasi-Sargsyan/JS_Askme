import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Avatar from '../../universal/Avatar/Avatar';
import SearchBox from "../../SearchBox/SearchBox";
import routePaths from '../../../constKeys/routePaths';
import "./NavBarItems.scss";
import InfoDrop from "../InfoDrop/InfoDrop";

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

                {/* <li>
                    <SearchBox />
                </li> */}

                <li className="img-li" ref={ (node) => this.wrapperRef = node }>
                    <Avatar clicked={this.handleInfoDrop} />
                    {this.state.infoOpen && <InfoDrop close={this.handleInfoDrop} />}
                </li>

                <li>
                    <NavLink to={routePaths.askQuestionPage}>
                        Ask a Question
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to={routePaths.profilePage}>
                        Profile
                    </NavLink>
                </li> */}
            </ul>
        )
    }
}

export default NavBarItems;