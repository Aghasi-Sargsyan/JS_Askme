import React, {Component} from "react";
import "./SettingPage.scss";
import Input from "../universal/Input/Input";
import male from "../../assets/icons/male.png";
import female from "../../assets/icons/female.png";

class SettingPage extends Component {

    state = {
        userName: "John Doe",
        birthYear: "1900",
        gender: "Male",
        email: "test@mail.ru",
        password: "123456"
    };

    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    handleClick = e => {
        e.preventDefault();
        const currentElem = e.target.id.substr(1);
        if (this.state[currentElem].length) {
            this.setState({userName: this.state.userName});
        } else {
            this.setState({userName: this.state.userName});
            alert("length is zero!");
        }
    };

    handleCheck = (e) => {
        this.setState({
            gender: e.target.value
        });
    };

    render() {
        const {userName, birthYear, gender, email, password} = this.state;
        return (
            <div className="setting__page">
                <div className="setting__profile">
                    <h1>{userName}</h1>
                    <form className="flex flex_column align_center">
                        <div>
                            <h2>Username</h2>
                            <Input type="text" id="userName" value={userName} changeHandler={this.handleChange}/>
                            <button id="_userName" className="btn" onClick={this.handleClick}>
                                Update
                            </button>
                        </div>
                        <hr/>
                        <div>
                            <h2>Birth Year</h2>
                            <Input
                                type="number"
                                id="birthYear"
                                value={birthYear}
                                changeHandler={this.handleChange}
                            />
                        </div>
                        <hr/>
                        <div>
                            <h2>Gender</h2>
                            <label>
                                <input
                                    type="radio"
                                    name="genderGroup"
                                    id="radioMale"
                                    defaultChecked="true"
                                    value="Male"
                                    onChange={this.handleCheck}
                                />
                                <img src={male} alt="male"/>
                            </label>
                            <label>
                                <input type="radio"
                                       name="genderGroup"
                                       value="Female"
                                       id="radioFemale"
                                       onChange={this.handleCheck}
                                />
                                <img src={female} alt="female"/>

                            </label>
                        </div>
                        <div>
                            <h2>Email</h2>
                            <Input type="email" id="email" value={email} changeHandler={this.handleChange}/>
                            <button id="_email" className="btn" onClick={this.handleClick}>
                                update
                            </button>
                        </div>
                        <hr/>
                        <div>
                            <h2>Password </h2>
                            <Input type="password" id="password" value={password} changeHandler={this.handleChange}/>
                            <button id="_password" className="btn" onClick={this.handleClick}>
                                Change
                            </button>
                        </div>
                        <hr/>
                        <button type="button" className="settings__save__btn">Save Changes</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SettingPage;