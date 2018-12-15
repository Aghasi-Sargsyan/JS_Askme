import React, { Component } from 'react';
// import Avatar from '../Avatar/Avatar';
import defaultAvatar from '../../../assets/profileImg.png';
import { Link } from "react-router-dom";
import FireManager from "../../../firebase/FireManager";

import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

import Avatar from '@material-ui/core/Avatar';
import './QuestionItem.scss';
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
        color: '#707070'
    },
    avatar: {
        margin: '0 10px'
    },
    chip: {
        margin: theme.spacing.unit,
    },
    reverse: {
        display: 'flex',
        flexDirection: 'row-reverse',
        margin: '0 20px',
        backgroundColor: '#fff',
        border: '1px solid #04a9f5',
    },
    answer: {
        backgroundColor: '#04a9f5',
        color: '#fff'
    },
    userName: {
        padding: '0px',
        "& span": {
            fontSize: '10px',
            width: '50px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
            padding: '5px 0',
        }
    }
});

class QuestionItem extends Component {

    state = {
        userName: "",
        photoUrl: ""
    };

    componentDidMount() {
        FireManager.getUser(this.props.question.userId).then(user => {
            this.setState({
                userName: user.userName,
                photoUrl: user.photoUrl
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user.photoUrl !== this.props.user.photoUrl) {
            FireManager.getUser(this.props.question.userId).then(user => {
                this.setState({
                    photoUrl: user.photoUrl
                });
            });
        }
    }

    render() {
        const { classes } = this.props;

        const descriptionArr = [];
        descriptionArr.push(this.props.question.description);
        const { question } = this.props;
        const formattedDate = new Date(question.date).toLocaleString();
        const userMinAge = question.age[0];
        const userMaxAge = question.age[question.age.length - 1];

        return (
            <Link to={`/item/${question.id}`} className='question_item_container'>

                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        {/* <div className='flex flex_column align_center'> */}
                        <div className='flex align_center flex_column tac'>
                            <ListItemAvatar>
                                <Avatar src={this.state.photoUrl ? this.state.photoUrl : defaultAvatar} />
                            </ListItemAvatar>
                            <ListItemText primary={this.state.userName} className={classes.userName} />
                        </div>
                        <ListItemText
                            primary={question.title}
                            secondary={
                                <>
                                    <Typography component="span" className={classes.inline}>
                                        <span dangerouslySetInnerHTML={{ __html: descriptionArr.join('') }}></span>
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                    <div className='question_item_footer flex justify_between align_center padh_24 '>
                        {question.skills.length !== 0
                            && <div className='question_item_skill'>
                                {question.skills.map(skill => <span key={skill}>
                                    <Chip label={skill} className={classes.chip} variant="outlined" />
                                </span>
                                )}
                            </div>}
                        <div className='flex'>
                            {userMinAge && userMaxAge && <div className='question_item_age'>
                                <Chip label={userMinAge + " - " + userMaxAge} className={classes.chip} variant="outlined" />

                            </div>}
                            {question.gender && <div className='question_item_gender'>
                                <Chip label={question.gender} className={classes.chip} variant="outlined" />
                            </div>}
                        </div>
                        <div className='flex align_center '>
                            <Chip
                                label="Answers"
                                className={`${classes.chip} ${classes.reverse}`}
                                avatar={<Avatar className={classes.answer}>{question.answerCount}</Avatar>}
                            />
                            <div className='question_item_date'>
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                    </div>
                    <Divider light />
                </List>
            </Link>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
};

export default withStyles(styles)(connect(mapStateToProps)(QuestionItem));
