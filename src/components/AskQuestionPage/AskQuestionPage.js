import React, { Component } from "react";
import Wysiwyg from '../universal/Wysiwyg/Wysiwyg';
import FireManager from "../../firebase/FireManager";
import { connect } from "react-redux";
import './AskQuestionPage.scss';
import { bindActionCreators } from "redux";
import { getAndDispatchDbUser } from "../../redux/actions/userActions";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import SkillContainer from '../SkillContainer/SkillContainer';
import { withRouter } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    group: {
        display: 'block',
    },
    radioBtn: {
        color: '#04a9f5'
    },
    gender: {
        height: '48px',
        lineHeight: '48px',
        display: 'inline-block',
        paddingRight: '20px'
    }
});

class AskQuestionPage extends Component {
    state = {
        title: "",
        description: "",
        wysiwygTxt: '',
        skills: [],
        skillDesc: '',
        gender: 'all',
        ageRange: { min: 15, max: 30 },
        age: [],
        isTyping: false,
    };

    handleChange = e => {
        if (typeof e === "string") {
            this.setState({
                description: e,
                wysiwygTxt: e
            });
        } else {
            this.setState({
                [e.target.id]: e.target.value
            });

            if (e.target.id === 'skillDesc') {
                this.setState({
                    isTyping: !!e.target.value
                })
            }
        }
    };

    handleAgeRange = (min, max) => {
        const ageArray = [];
        for (let i = min; i <= max; i++) {
            ageArray.push(i);
        }
        this.setState({ age: ageArray });
    };

    handleRadioButton = (e) => {
        this.setState({ gender: e.target.value });
    };

    addSkill = () => {
        const { skills, skillDesc } = this.state;
        const skillList = skills.concat(skillDesc);
        this.setState({
            skills: skillList,
            skillDesc: "",
            gender: ""
        })
    };

    deleteSkill = (skill) => () => {
        console.log(skill);
        const array = [...this.state.skills];
        const index = array.indexOf(skill);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ skills: array });
        }
    };
    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            this.addSkill();
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const { title, description, skills, age, gender } = this.state;
        const question = {
            id: null,
            userId: this.props.user.id,
            title: title,
            description: description,
            rate: 0,
            answerCount: 0,
            date: Date.now(),
            update: "",
            skills: skills,
            skills_insensitive: skills.map(skill => skill.toUpperCase()),
            age: age,
            gender: gender
        };
        const questionId = FireManager.addQuestion(question, this.props.user.id);
        this.props.history.push(`/item/${questionId}`);
    };

    render() {
        const { isTyping } = this.state;
        const { classes } = this.props;

        return (
            <div className='ask_question'>
                <h2>Ask Your Question</h2>
                <div className='flex'>
                    <input
                        className='ask_question_title'
                        placeholder="What's your question"
                        onChange={this.handleChange}
                        id="title"
                        value={this.state.title}
                    />
                </div>
                <div>
                    <Wysiwyg value={this.state.wysiwygTxt} changeHandler={this.handleChange} />
                </div>
                <div className='flex ask_question_field'>
                    <div className='col--6'>
                        <label>
                            Skills
                        <input
                                value={this.state.skillDesc}
                                onChange={this.handleChange}
                                id="skillDesc"
                                className='mar_left_20'
                                onKeyPress={this.handleKeyPress}
                            />
                        </label>
                        <button type='button' onClick={this.addSkill} className='ask_question_skill_add'>
                            +
                    </button>
                        <ul className='skill_list'>
                            <SkillContainer isShowingMessage={false} deleteSkill={this.deleteSkill}
                                skills={this.state.skills} />
                        </ul>
                    </div>
                    <div className='col--6'>
                        <div className='age__slider flex'>
                            <span className='age__slider_age'>Age</span>
                            <InputRange
                                disabled={isTyping}
                                draggableTrack
                                maxValue={70}
                                minValue={10}
                                onChange={value => this.setState({ ageRange: value })}
                                onChangeComplete={value => this.handleAgeRange(value.min, value.max)}
                                value={this.state.ageRange} />
                        </div>
                        <div className={classes.root}>
                            <span className={classes.gender}>Gender</span>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender2"
                                    className={classes.group}
                                    value={this.state.gender}
                                    onChange={this.handleRadioButton}
                                >
                                    <FormControlLabel
                                        value="all"
                                        control={<Radio className={classes.radioBtn} />}
                                        label="All"
                                        defaultChecked="true"
                                        labelPlacement="start"
                                        disabled={!!isTyping}
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio className={classes.radioBtn} />}
                                        label="Female"
                                        labelPlacement="start"
                                        disabled={!!isTyping}
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio className={classes.radioBtn} />}
                                        label="Male"
                                        labelPlacement="start"
                                        disabled={!!isTyping}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <button type='submit'
                    className='ask_question_submit'
                    onClick={this.onSubmit}
                    disabled={!this.state.title.length || !this.state.description}
                >
                    Post Your Question
                </button >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getAndDispatchDbUser: bindActionCreators(getAndDispatchDbUser, dispatch),
    };
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(AskQuestionPage)));
