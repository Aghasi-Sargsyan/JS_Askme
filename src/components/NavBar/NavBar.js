import React, { Component } from 'react';
import routePaths from "../../constKeys/routePaths";
import SignOutButton from "../registration/SignOut/SignOut";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Hidden, Drawer, Divider, CssBaseline, Avatar } from "@material-ui/core";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Logo from "../universal/Logo/Logo";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles'
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";

class NavBar extends Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, user } = this.props;
        const { mobileOpen } = this.state;

        const drawer = (
            <div className={classes.side__drawer}>
                <Logo />
                <Divider />
                <List>
                    <NavLink to={routePaths.profilePage}>
                        <ListItem className={classes.drawerLi}>
                            <ListItemText className="name" primary={user.userName.toLocaleUpperCase()} />
                            <ListItemIcon children={<Avatar className={classes.avatar} src={user.photoUrl} />} />
                        </ListItem>
                    </NavLink>

                    <Divider />
                    <ListItem
                        className={classes.drawerLi}
                        children={<NavLink to={routePaths.questionPage}>
                            Answers
                        </NavLink>} />
                    <ListItem
                        className={classes.drawerLi}
                        children={<NavLink to={routePaths.askQuestionPage}>
                            Ask a question
                        </NavLink>}
                    />
                </List>
                <Divider />
                <List>
                    <ListItem
                        className={classes.drawerLi}
                        children={<NavLink to={routePaths.settingPage}>Settings
                        </NavLink>}
                    />
                    <ListItem
                        className={classes.drawerLi}
                        children={<SignOutButton />}
                    />
                </List>
            </div>
        );

        return (
            <>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar className={classes.appBar} position="fixed">
                        <Toolbar className={classes.toolbar}>
                            <IconButton color="primary"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <MenuList className={classes.menuList}>
                                <Logo />
                                <MenuItem
                                    className={classes.listLi}
                                    children={<NavLink to={routePaths.questionPage}>Answers</NavLink>} />
                                <MenuItem
                                    className={classes.listLi}
                                    children={<NavLink to={routePaths.askQuestionPage}>
                                        Ask a question
                                    </NavLink>} />
                                <MenuItem
                                    className={classes.listLi}
                                    children={<NavLink to={routePaths.settingPage}>Settings
                                    </NavLink>} />
                                <MenuItem
                                    className={classes.listLi}
                                    children={<NavLink to={routePaths.profilePage}>
                                        <Avatar className={classes.avatar} src={user.photoUrl} />
                                    </NavLink>} />
                                <MenuItem
                                    className={classes.listLi}
                                    children={<SignOutButton />} />
                            </MenuList>
                        </Toolbar>
                    </AppBar>
                    <Hidden smDown implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </div>
            </>
        )
    }
}

const drawerWidth = 330;

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        background: '#ffffff',
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
        height: "100px",
        marginLeft: drawerWidth,
    },
    menuButton: {
        color: "#2196f3",
        height: 100,
        width: 100,
        marginRight: 20,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        "&>span": {
            "&>svg": {
                width: "2em",
                height: "2em",
                fontSize: 20
            }
        },
        '&:hover': {
            backgroundColor: "#fff",
        }
    },
    toolbar: theme.mixins.toolbar,
    minHeight: '72px',
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    flex: {
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)'
        }
    },
    listStyles: {
        display: 'flex',
        margin: 0
    },
    listLi: {
        minHeight: "fit-content",
        margin: '0 8px',
        "fontFamily": "\"Raleway\", \"Helvetica\", \"Arial\", sans-serif",
        '&:hover': {
            backgroundColor: "#fff",
            "&>a": {
                color: "#2196f3",
                cursor: "pointer"
            },
        },
        '&>a': {
            color: "#202020",
        }
    },
    drawerLi: {
        minHeight: "fit-content",
        "fontFamily": "\"Raleway\", \"Helvetica\", \"Arial\", sans-serif",
        '&:hover': {
            backgroundColor: "#fff",
            margin: 0,
            "&>a": {
                color: "#2196f3",
                cursor: "pointer"
            },
            "&>div>span": {
                color: "#2196f3",
                cursor: "pointer"
            },
        },
        "&>div": {
            width: 100,
        },
        '&>a': {
            color: "#202020",
        }
    },
    avatar: {
        width: 60,
        height: 60,
    },
    menuList: {
        width: "100%",
        height: "100px",
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        listStyleType: 'none',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    ulLink: {
        textDecoration: 'none',
        paddingBottom: '6px'
    },
    side__drawer: {
        overflow: "hidden",
        "& .header__logo": {
            fontSize: 28,
            marginBottom: 22,
            marginTop: 22
        }
    },
    icons: {
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "40%",
        "& img": {
            width: "auto",
            height: "auto"
        }
    }
});

const mapStateToProps = (state) => ({
    user: state.userReducer
});

export default connect(mapStateToProps)(withStyles(styles)(NavBar));