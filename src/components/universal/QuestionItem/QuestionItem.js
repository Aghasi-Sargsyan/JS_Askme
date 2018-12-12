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

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    avatar: {
        margin: '0 10px'
    },
    chip: {
        margin: theme.spacing.unit,
    },
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
            })
        });
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
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={this.state.photoUrl ? this.state.photoUrl : defaultAvatar} />
                            {/* <Typography component="span" className={classes.inline} color="textPrimary">
                                <span>{this.state.userName}</span>
                            </Typography> */}
                        </ListItemAvatar>
                        <ListItemText
                            primary={question.title}
                            secondary={
                                <>
                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                        <span dangerouslySetInnerHTML={{ __html: descriptionArr.join('') }}></span>
                                    </Typography>
                                </>
                            }
                        />

                    </ListItem>
                    {/* <Typography component="span" className={classes.inline} color="textPrimary">
                        <span>{question.rate}</span>
                        <span>{question.answerCount}</span>
                    </Typography> */}
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
                        <div className='question_item_date'>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                    <Divider light />
                </List>
                {/* <div className='question_item_content'>
                    <div className='flex justify_between'>
                        <div className='question_item_title'>
                            {question.title}
                        </div> */}
                {/* <div className='question_item_buttons'>
                            {!this.props.profileQuestion &&
                                <>
                                    <button>-</button>
                                    <button>x</button>
                                </>
                            }
                        </div> */}
                {/* </div>

                    <div className='question_item_desc flex align_center'>
                        <div className='flex_grow question_item_wysiwyg'>
                            <div dangerouslySetInnerHTML={{ __html: descriptionArr.join('') }}></div>
                        </div>
                        <div className='flex align_center'>
                            <div className='flex question_item_scores'>
                                <div>{question.rate}</div>
                                <div>{question.answerCount}</div>
                            </div>
                            <div className='flex question_item_user align_center'>
                                <div className='question_item_avatar'>
                                    <Avatar className={classes.avatar} src={this.state.photoUrl ? this.state.photoUrl : defaultAvatar} />
                                </div>
                                <div className='question_item_writer ellipsis'>
                                    <div className='ellipsis'>{this.state.userName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='question_item_footer flex justify_between align_center'>
                        {question.skills.length !== 0
                            && <div className='question_item_skill'>
                                {question.skills.map(skill => <span key={skill}>{skill}</span>)}
                            </div>}
                        <div className='flex'>
                            {userMinAge && userMaxAge && <div className='question_item_age'>
                                <span>{userMinAge + " - " + userMaxAge}</span>
                            </div>}
                            {question.gender && <div className='question_item_gender'>
                                <span>{question.gender}</span>
                            </div>}
                        </div>
                        <div className='question_item_date'>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div> */}
            </Link>
        )
    }
}

export default withStyles(styles)(QuestionItem);