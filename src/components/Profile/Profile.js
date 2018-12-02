import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserInfo from './UserInfo/UserInfo';
import SkillContainer from '../SkillContainer/SkillContainer';
import ProfileQuestionsCont from './ProfileQuestionsCont/ProfileQuestionsCont';
import Tabs from './ProfileQuestionsCont/Tabs/Tabs';
import Pane from './ProfileQuestionsCont/Pane/Pane';
import "./Profile.scss";
import Input from "../universal/Input/Input";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.tabs = [
            {
                name: 'My Questions',
                content: <ProfileQuestionsCont myQuestions />
            },
            {
                name: 'Answered Questions',
                content: <ProfileQuestionsCont/>
            }
        ];

        this.state = {
            userName: "John Doe",
            age: 34,
            gender: "male",
            skills: [
                {value: "JS", rate: 20},
                {value: "HTML", rate: 10},
                {value: "CSS", rate: 30},
                {value: "PHP", rate: 25},
            ],
            isShowAdd: false,
            inputValue: ""
        }
    }

    changeHandler = (e) => {
        this.setState({inputValue: e.target.value});
    };

    addSkillHandler = () => {
        this.setState(prevState => ({
            isShowAdd: !prevState.isShowAdd
        }));

        this.state.inputValue.length && this.setState({
            skills: [{value: this.state.inputValue, rate: 0}, ...this.state.skills],
            inputValue: ""
        });
    };

    deleteSkill = (e) => {
        const array = [...this.state.skills];
        const index = e.target.id;
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({skills: array});
        }
    };

    render() {
        const {userName, age, gender, skills, isShowAdd, inputValue} = this.state;
        return (
            <div className="profile_page">
                <aside className="left__side">
                    <UserInfo userName={userName} age={age} gender={gender}/>
                    <div className="user__skills">
                        <SkillContainer deleteSkill={this.deleteSkill} skills={skills} saturation={100}/>
                        {isShowAdd && <Input
                            className="input__skill"
                            valid
                            changeHandler={this.changeHandler}
                            value={inputValue}/>
                        }
                        <button className="add__user__skill__btn" onClick={this.addSkillHandler}>Add Skill</button>
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

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    };
}

export default connect(mapStateToProps)(Profile);