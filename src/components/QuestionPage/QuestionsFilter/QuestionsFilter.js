import React, { Component } from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import { FilterList } from "@material-ui/icons";


import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';


import './QuestionsFilter.scss';

const styles = theme => ({
    root: {
        position: 'fixed',
        bottom: 20,
        right: 20
    },
    paper: {
        position: 'absolute',
        bottom: 65,
        right: 12,
    },
    fake: {
        backgroundColor: grey[200],
        height: theme.spacing.unit,
        margin: theme.spacing.unit * 2,
        // Selects every two elements among any group of siblings.
        '&:nth-child(2n)': {
            marginRight: theme.spacing.unit * 3,
        },
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class QuestionsFilter extends Component {
    state = {
        open: false,
    };
    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    handleClickAway = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <ClickAwayListener className={classes.filterParent} onClickAway={this.handleClickAway}>
                    <div>
                        <Tooltip title="Filter" aria-label="Filter">
                            <Fab onClick={this.handleClick} color="secondary" className={classes.absolute}>
                                <FilterList />
                            </Fab>
                        </Tooltip>
                        {open ? (
                            <Paper className={classes.paper}>
                                <List
                                    component="nav"
                                    subheader={<ListSubheader component="div">Filter</ListSubheader>}
                                // className={classes.root}
                                >
                                    <ListItem button id={"all"} onClick={this.props.filterClickHandler}>
                                        <ListItemIcon>
                                            <SendIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary="All" />
                                    </ListItem>
                                    <ListItem button button id={"age"} onClick={this.props.filterClickHandler}>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Age" />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Gender" />
                                    </ListItem>
                                    <ListItem button onClick={this.handleClick}>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Skills" />
                                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested}>
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Starred" />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                </List>
                                {/* <ul className='flex flex_column align_start filter_items'>
                                    <li>
                                        <button id={"all"} onClick={this.props.filterClickHandler}>
                                            All
                                        </button>
                                    </li>
                                    <li>
                                        <button id={"age"} onClick={this.props.filterClickHandler}>
                                            Age
                                        </button>
                                    </li>
                                    <li>
                                        <button id={"gender"} onClick={this.props.filterClickHandler}>
                                            Gender
                                        </button>
                                    </li>
                                    <li className='flex flex_column align_start'>
                                        Skills
                                        <ul className='flex wrap align_start questions-skills-menu'>
                                            {this.props.skills.map((skill, index) =>
                                                <li key={index}>
                                                    <button onClick={this.props.filterClickHandler}
                                                        id={skill.value}>
                                                        {skill.value}
                                                    </button>
                                                </li>)}
                                        </ul>
                                    </li>
                                </ul> */}
                            </Paper>
                        ) : null}
                    </div>
                </ClickAwayListener>
            </div>
            // <div className='questions-filter-container '>
            // <ul className='flex flex_column align_start'>
            //     <li>
            //         <button id={"all"} onClick={this.props.filterClickHandler}>
            //             All
            //         </button>
            //     </li>
            //     <li>
            //         <button id={"age"} onClick={this.props.filterClickHandler}>
            //             Age
            //         </button>
            //     </li>
            //     <li>
            //         <button id={"gender"} onClick={this.props.filterClickHandler}>
            //             Gender
            //         </button>
            //     </li>
            //     <li className='flex flex_column align_start'>
            //         Skills
            //         <ul className='flex wrap align_start questions-skills-menu'>
            //             {this.props.skills.map((skill, index) =>
            //                 <li key={index}>
            //                     <button onClick={this.props.filterClickHandler}
            //                         id={skill.value}>
            //                         {skill.value}
            //                     </button>
            //                 </li>)}
            //         </ul>
            //     </li>
            // </ul> 
            // </div>
        )
    }
}
export default withStyles(styles)(QuestionsFilter);
