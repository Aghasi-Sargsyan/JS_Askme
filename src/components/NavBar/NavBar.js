import NavBarItems from "./NavBarItems/NavBarItems";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {Link} from "react-router-dom";
import routePaths from "../../constKeys/routePaths";
import {connect} from "react-redux";
import "./NavBar.scss";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SignOutButton from "../registration/SignOut/SignOut";


const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
};

class NavBar extends Component {
    state = {
        auth: !this.props.user.id,
        anchorEl: null
    };

    handleChange = e => {
        this.setState({ auth: e.target.checked });
    };

    handleMenu = e => {
        this.setState({ anchorEl: e.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
    
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                {auth && (
                  <div>
                    <IconButton
                      aria-owns={open ? 'menu-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>
                                <Link to={routePaths.profilePage}>
                                    Profile
                                </Link>
                        </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <Link to={routePaths.settingPage + this.props.user.id } >
                            Settings
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <SignOutButton />
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}
// const NavBar = ({ history }) => (
//     <div className="navigation-bar flex">
//         <NavBarItems history={history} />
//     </div>
// );

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NavBar)));