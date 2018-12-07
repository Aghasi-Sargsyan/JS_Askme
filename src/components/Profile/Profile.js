import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfo from './UserInfo/UserInfo';
import SkillContainer from '../SkillContainer/SkillContainer';
import ProfileQuestionsCont from './ProfileQuestionsCont/ProfileQuestionsCont';
import Tabs from './ProfileQuestionsCont/Tabs/Tabs';
import Pane from './ProfileQuestionsCont/Pane/Pane';
import "./Profile.scss";
import { bindActionCreators } from "redux";
import { actionAddUserData } from "../../redux/actions/userActions";
import FireManager from "../../firebase/FireManager";
import Autocomplete from "../universal/Autocomplete/Autocomplete";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.tabs = [
            {
                name: 'My Questions',
                content: <ProfileQuestionsCont askedQuestions />
            },
            {
                name: 'Answered Questions',
                content: <ProfileQuestionsCont answeredQuestions />
            }
        ];

        this.state = {
            isShowAdd: false,
            inputValue: "",
            globalSkill: [],
            localSkills: [],
            filteredSkills: []
        }
    }

    addSkillHandler = () => {
        const localSkills = [];
        const { skills } = this.props.user;

        for (let key in skills) {
            if (skills.hasOwnProperty(key)) {
                localSkills.push(skills[key].value.toUpperCase());
            }
        };

        FireManager.getGlobalSkills().then((result) => {
            this.setState({
                globalSkill: result
            });
            const filteredSkills = this.state.globalSkill.filter(unique => localSkills.indexOf(unique) === -1);

            this.setState(prevState => ({
                isShowAdd: !prevState.isShowAdd,
                localSkills: localSkills,
                filteredSkills: filteredSkills
            }));
        });

        const dublicatedSkills = this.state.localSkills.includes(this.state.inputValue.toUpperCase());

        console.log('local', this.state.localSkills);
        console.log('inputValue', this.state.inputValue);
        console.log('dublicatedSkills', dublicatedSkills);

        if (this.state.inputValue.length && !dublicatedSkills) {
            const newSkills = this.props.user.skills.concat({ value: this.state.inputValue, rate: 0 });

            FireManager.addGlobalSkill(this.state.inputValue);
            FireManager.updateUser({
                skills: newSkills,
                skills_insensitive: newSkills.map(skill => skill.value.toUpperCase()),
            }, this.props.user.id);
            this.props.dispatchUserData({
                skills: newSkills,
                skills_insensitive: newSkills.map(skill => skill.value.toUpperCase()),
            });
            this.setState({
                inputValue: ""
            });
        }
    };

    deleteSkill = (e) => {
        const targetSkill = e.target.id;
        const { user } = this.props;
        const newSkills = user.skills.filter(skill => skill.value !== targetSkill);
        this.props.dispatchUserData({
            skills: newSkills,
            skills_insensitive: newSkills.map(skill => skill.value.toUpperCase()),
        });
        FireManager.updateUser({
            skills: newSkills,
            skills_insensitive: newSkills.map(skill => skill.value.toUpperCase()),
        }, user.id);
    };

    onSkillInputChange = (inputValue) => {
        this.setState({
            inputValue
        });
    };

    render() {
        const { isShowAdd, inputValue, filteredSkills } = this.state;
        const { user } = this.props;
        return (
            <div className="profile_page flex">
                <aside className="left__side">
                    <UserInfo user={user} />
                    <div className="user__skills tac">
                        <SkillContainer isSkillObj deleteSkill={this.deleteSkill} skills={user.skills} />
                        <div className='flex flex_column align_center pos_rel'>
                            {isShowAdd && <Autocomplete
                                className="input__skill"
                                value={inputValue}
                                changeHandler={this.onSkillInputChange}
                                suggestions={filteredSkills} />
                            }
                            <button className="add__user__skill__btn" onClick={this.addSkillHandler}>Add Skill</button>
                        </div>
                    </div>
                </aside>
                <aside className="right__side flex flex_column">
                    <div className='flex justify_center profile_questions_tab'>
                        <Tabs selected={0}>
                            {
                                this.tabs.map(tab =>
                                    <Pane key={tab} label={tab.name}>{tab.content}</Pane>)
                            }
                        </Tabs>
                    </div>
                </aside>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUserData: bindActionCreators(actionAddUserData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);