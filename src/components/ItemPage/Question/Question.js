import React, { Component } from "react";
// import Avatar from '../../universal/Avatar/Avatar';
import RateCounter from '../../universal/RateCounter/RateCounter';
import FireManager from "../../../firebase/FireManager";
import defaultAvatar from '../../../assets/profileImg.png';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import './Question.scss';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        margin: theme.spacing.unit,
    },
});


class Question extends Component {

    state = {
        userName: "",
        photoUrl: ""
    };

    componentDidMount() {
        FireManager.getUser(this.props.question.userId).then(user =>
            this.setState({
                userName: user.userName,
                photoUrl: user.photoUrl
            })
        )
    }

    render() {
        const descriptionArr = [];
        descriptionArr.push(this.props.question.description);
        const { classes } = this.props;

        return (
            <div className='item__question__page'>
                <h2 className='item__question__title'>
                    {this.props.question.title}
                </h2>
                <hr />
                <div className='flex align_center'>
                    <div>
                        <RateCounter />
                    </div>
                    <div className='item__question__avatar flex align_center flex_col'>
                        <Avatar src={this.state.photoUrl ? this.state.photoUrl : defaultAvatar} />
                        <span className='font_s ellipsis'>{this.state.userName}</span>
                    </div>
                    <div className='pad_right_20 pad_left_20'>
                        <div className='item__question__desc' dangerouslySetInnerHTML={{ __html: descriptionArr.join('') }}></div>
                        <div className='item__question__skill'>
                            {this.props.question.skills.map(skill => <span key={skill}>
                                <Chip label={skill} className={classes.chip} variant="outlined" />
                            </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Question);
