import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import './Skill.scss';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
    color: '#04a9f5',
    border: '1px solid #04a9f5',
    "& svg": {
      color: 'rgb(4, 169, 245)'
    }
  },
});

const Skill = props => {
  const { value, skill, deleteSkill, classes } = props;

  return (
    <div className={classes.root}>
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

