import React, { Component } from "react";
import "./SettingPage.scss";
import Input from "../universal/Input/Input";
import male from "../../assets/icons/male.png";
import female from "../../assets/icons/female.png";
import settingIcon from "../../assets/icons/settings.png";
import { connect } from 'react-redux';
import FireManager from "../../firebase/FireManager";
import * as firebase from "firebase";
import { withRouter } from "react-router-dom";
import routePaths from "../../constKeys/routePaths";

class SettingPage extends Component {

    state = {
        userName: "",
        password: "",
        email: "",
        age: "",
        gender: "",
    };

    componentDidMount() {
        const { user } = this.props;
        this.props.user && this.setState({
            userName: user.userName,
            email: user.email,
            age: (new Date().getFullYear() - user.age),
            gender: user.gender,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user.id !== this.props.user.id) {
            const { user } = this.props;
            this.props.user && this.setState({
                userName: user.userName,
                email: user.email,
                age: (new Date().getFullYear() - user.age),
                gender: user.gender,
            });
        }
    }

    handleChange = e => {
        console.info(e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = () => {
        const { userName, email, age, gender } = this.state;
        FireManager.updateUser({
            userName,
            email,
            age,
            gender,
        }, this.props.user.id);

        const user = firebase.auth().currentUser;
        const p1 = user.updateEmail(this.state.email);
        const p2 = user.updatePassword(this.state.password);

        Promise.all([p1, p2])
            .catch(() => this.props.history.push(routePaths.profilePage))
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
        const { userName, email, age } = this.state;
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
                                <Input type="text"
                                    valid id="userName"
                                    value={userName}
                                    changeHandler={this.handleChange} />
                            </div>
                        </div>
                        <hr />
                        <div className='flex align_center'>
                            <label>Birth Year</label>
                            <Input
                                type="number"
                                id="age"
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
                                    value="male"
                                    checked={this.state.gender === "male"}
                                    onChange={this.handleCheck}
                                />
                                <img src={male} alt="male" />
                            </label>
                            <label>
                                <input type="radio"
                                    name="genderGroup"
                                    value="female"
                                    id="radioFemale"
                                    checked={this.state.gender === "female"}
                                    onChange={this.handleCheck}
                                />
                                <img className='female' src={female} alt="female" />
                            </label>
                        </div>
                        <hr />
                        <div>
                            <div className='flex align_center'>
                                <label>Email </label>
                                <Input type="email" id="email" valid
                                    value={email}
                                    changeHandler={this.handleChange} />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className='flex align_center'>
                                <label>Update Password </label>
                                <Input type="password" id="password" valid changeHandler={this.handleChange} />
                            </div>
                        </div>
                        <hr />
                        <button type="button"
                            className="settings__save__btn"
                            onClick={this.handleSubmit}
                        >
                            Save Changes
                        </button>
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

export default withRouter(connect(mapStateToProps)(SettingPage));
