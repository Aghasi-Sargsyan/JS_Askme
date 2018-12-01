import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfo from './UserInfo/UserInfo';
import SkillContainer from '../SkillContainer/SkillContainer';
import ProfileQuestionsCont from './ProfileQuestionsCont/ProfileQuestionsCont';
import Tabs from './ProfileQuestionsCont/Tabs/Tabs';
import Pane from './ProfileQuestionsCont/Pane/Pane';
import "./Profile.scss";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.tabs = [
            {
                name: 'My Questions',
                content: <ProfileQuestionsCont />
            },
            {
                name: 'Answered Questions', 
                content: <ProfileQuestionsCont />
            }
        ]
    }
  
    render() {
        const { user } = this.props;
        return (
            <div className="profile_page">
                <aside className="left__side">
                    <UserInfo userName={user.userName} age={user.age} gender={user.gender} />
                    <SkillContainer skills={user.skills} saturation={100} />
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
        user: state.userReducer,
    };
}

export default connect(mapStateToProps)(Profile);