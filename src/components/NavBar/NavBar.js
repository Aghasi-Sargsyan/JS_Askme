import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import React, {Component} from 'react'
import NavBarItem from "./NavBarItem/NavBarItem";
import Logo from "../universal/Logo/Logo";
import routePaths from "../../constKeys/routePaths";
import SignOutButton from "../registration/SignOut/SignOut";
import Settings from '@material-ui/icons/Settings';
import SettingPage from "../SettingPage/SettingPage";
import {Link} from "react-router-dom";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";


class NavBar extends Component {
    render() {
        const {classes, user} = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar className={classes.toolbar}>
                        <MenuList className={classes.menuList}>
                            <MenuItem
                              children={<Link className={classes.aStyle} to={routePaths.questionPage}>Answers</Link>}
                            />
                            <MenuItem
                              children={<Link className={classes.aStyle} to={routePaths.askQuestionPage}>Ask a question</Link>}
                            />
                            <MenuItem
                              children={<SignOutButton className={classes.aStyle} />}
                            />
                            <MenuItem
                              children={<Link to={routePaths.profilePage}> <Avatar src={user.photoUrl} className={classes.aStyle} /> </Link>}
                            />
                            <MenuItem
                              children={<Link to={routePaths.settingPage}> <Settings className={classes.aStyle} /> </Link>}
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
        width: '100%'
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
    menuButton: {
        color: `${theme.palette.primary[500]}`,
        marginLeft: -12,
        marginRight: 10,
        alignSelf: 'center'
    },
    telLink: {
        padding: '8px',
        margin: '8px',
        fontSize: '18px'
    },
    invertedBtn: {
        color: '#21412a',
        backgroundColor: 'transparent',
        border: '2px #21412a solid',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#21412a',
            color: 'white'
        }
    },
    listStyles: {
        display: 'flex',
        margin: 0
    },
    listLi: {
        margin: '0 8px',
        "&::after" : {
            content: "",
            position: "absolute",
            top: "calc(100% - 0.125rem)",
            borderBottom: "0.125rem solid #fefefe",
            left: "50%",
            right: "50%",
            transition: "all 0.5s ease",
        },
        "&:hover::after" : {
            left: 0,
            right: 0,
            transition: "all 0.5s ease",
        }
    },
    aStyle: {
        color:"#2196f3"
    },
    col1: {
        display: 'flex'
    },
    col2: {
        flex: 1
    },
    col2Top: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    menuList: {
        width: "100%",
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        listStyleType: 'none',
        margin: 0
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