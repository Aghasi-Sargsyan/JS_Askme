import AppBar from '@material-ui/core/AppBar'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import React, {Component} from 'react'
import Logo from "../universal/Logo/Logo";
import routePaths from "../../constKeys/routePaths";
import SignOutButton from "../registration/SignOut/SignOut";
import Settings from '@material-ui/icons/Settings';
import {NavLink} from "react-router-dom";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import {connect} from "react-redux";


class NavBar extends Component {
    render() {
        const {classes, user} = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar className={classes.toolbar}>
                        <MenuList className={classes.menuList}>
                            <Logo/>
                            <MenuItem
                                className={classes.listLi}
                                children={<NavLink activeStyle={{color: "#2196f3"}}
                                                   to={routePaths.questionPage}>Answers</NavLink>}
                            />
                            <MenuItem
                                className={classes.listLi}
                                children={<NavLink activeStyle={{color: "#2196f3"}} to={routePaths.askQuestionPage}>
                                    Ask a question
                                </NavLink>}
                            />
                            <MenuItem
                                className={classes.listLi}
                                children={<NavLink activeStyle={{color: "#2196f3"}} to={routePaths.profilePage}>
                                    <Avatar className={classes.avatar} src={user.photoUrl}/>
                                </NavLink>}
                            />
                            <MenuItem
                                className={classes.listLi}
                                children={<NavLink activeStyle={{color: "#2196f3"}} to={routePaths.settingPage}> <Settings/>
                                </NavLink>}
                            />
                            <MenuItem
                                className={classes.listLi}
                                children={<SignOutButton/>}
                            />
                        </MenuList>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)'
        }
    },
    appBar: {
        background: '#ffffff',
    },
    toolbar: {
        minHeight: '72px',
        [theme.breakpoints.down('sm')]: {
            minHeight: '80px'
        }
    },
    listStyles: {
        display: 'flex',
        margin: 0
    },
    listLi: {
        padding: 0,
        minHeight: "fit-content",
        margin: '0 8px',
        "fontFamily": "\"Raleway\", \"Helvetica\", \"Arial\", sans-serif",
        '&:hover': {
            backgroundColor: "#fff",
            "&>a": {
                color: "#2196f3"
            },
        },
    },
    avatar: {
        width: 60,
        height: 60,
    },
    aStyle: {
        "&&&&:hover:before": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.42)"
        },
        position: "relative",
        color: "#202020",
        '&::before': {
            content: "",
            position: "absolute",
            width: "100%",
            height: "2px",
            bottom: 0,
            left: 0,
            backgroundColor: "#000",
            visibility: "hidden",
            transform: "scaleX(0)",
            transition: "all 0.3s ease-in-out 0s",
        }
    },
    menuList: {
        width: "100%",
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        listStyleType: 'none',
        margin: 0,
    },
    ulLink: {
        textDecoration: 'none',
        paddingBottom: '6px'
    },
});

const mapStateToProps = (state) => ({
    user: state.userReducer
});

export default connect(mapStateToProps)(withStyles(styles)(NavBar));


// import NavBarItem from "./NavBarItem/NavBarItem";
// import React from 'react';
// import { withRouter } from "react-router-dom";
// import "./NavBar.scss";
//
// const NavBar = ({ history }) => (
//     <div className="navigation-bar flex">
//         <NavBarItem history={history} />
//     </div>
// );
//
// export default withRouter(NavBar);