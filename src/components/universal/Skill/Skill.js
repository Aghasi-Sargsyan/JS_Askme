import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import './Skill.scss';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
    backgroundColor: '#04a9f5',
  },
});

const Skill = props => {
  const { value, rate } = props;
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Chip
        id={value}
        label={value}
        onDelete={props.deleteSkill}
        className={classes.chip}
        color="primary"
      />
      <span>{rate}</span>
    </div>

    // <li id={value}>

    //   {/* <p>{value} </p>
    //   <button id={value} onClick={props.deleteSkill}>x</button> */}
    //   {/* {rate && <span>{rate}</span>} */}

    //   <span>{rate}</span>

    // </li>
  );
};

export default withStyles(styles)(Skill);

