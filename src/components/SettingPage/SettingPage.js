import React, { Component } from "react";
import "./SettingPage.scss";
import Input from "../universal/Input/Input";
import male from "../../assets/icons/male.png";
import female from "../../assets/icons/female.png";
import settingIcon from "../../assets/icons/settings.png";
import { connect } from 'react-redux';

class SettingPage extends Component {

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleClick = e => {
        e.preventDefault();
        const currentElem = e.target.id.substr(1);
        if (this.state[currentElem].length) {
            this.setState({ userName: this.state.userName });
        } else {
            this.setState({ userName: this.state.userName });
            alert("length is zero!");
        }
    };

    handleCheck = (e) => {
        this.setState({
            gender: e.target.value
        });
    };

    render() {
        const { userName, age, email } = this.props.user;
        return (
            <div className="setting__page">
                <div className='setting__aside'>
                    <div className='flex  align_center'>
                        <img className='setting-icon' src={settingIcon} alt='setting' />
                        <p>Settings</p>
                    </div>
                </div>
                <div className="setting__profile">
                    <h1>{userName}</h1>
                    <form className="flex flex_column">
                        <div>
                            <div className='flex align_center'>
                                <label>Username </label>
                                <Input type="text" valid id="userName" value={userName} changeHandler={this.handleChange} />
                            </div>
                        </div>
                        <hr />
                        <div className='flex align_center'>
                            <label>Birth Year</label>
                            <Input
                                type="number"
                                id="birthYear"
                                valid
                                value={age}
                                changeHandler={this.handleChange}
                            />
                        </div>
                        <hr />
                        <div className='setting__page_gender'>
                            <span className='pad_right_20'>Gender </span>
                            <label>
                                <input
                                    type="radio"
                                    name="genderGroup"
                                    id="radioMale"
                                    defaultChecked="true"
                                    value="Male"
                                    onChange={this.handleCheck}
                                />
                                <img src={male} alt="male" />
                            </label>
                            <label>
                                <input type="radio"
                                    name="genderGroup"
                                    value="Female"
                                    id="radioFemale"
                                    onChange={this.handleCheck}
                                />
                                <img className='female' src={female} alt="female" />
                            </label>
                        </div>
                        <hr />
                        <div>
                            <div className='flex align_center'>
                                <label>Email </label>
                                <Input type="email" id="email" valid value={email} changeHandler={this.handleChange} />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className='flex align_center'>
                                <label>Current Password </label>
                                <Input type="password" id="password" valid changeHandler={this.handleChange} />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className='flex align_center'>
                                <label>Update Password </label>
                                <Input type="password" id="confPassword" valid changeHandler={this.handleChange} />
                            </div>
                        </div>
                        <hr />
                        <button type="button" className="settings__save__btn">Save Changes</button>
                    </form>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(SettingPage);
