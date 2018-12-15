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
    // backgroundColor: '#04a9f5',
  },
});

const Skill = props => {
  const { value, skill, deleteSkill, classes } = props;

  return (
    <div className={classes.root}>
      {/* <Chip
        id={value}
        label={value}
        onDelete={deleteSkill(skill)}
        className={classes.chip}
        color="primary"
      /> */}
      <Chip
        id={value}
        label={value}
        onDelete={deleteSkill(skill)}
        className={classes.chip}
        color='primary'
        variant="outlined"
      />
    </div>
  );
};

export default withStyles(styles)(Skill);

