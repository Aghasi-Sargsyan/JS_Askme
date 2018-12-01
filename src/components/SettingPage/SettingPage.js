import React, {Component} from 'react';
import "./SettingPage.scss";
import Input from "../universal/Input/Input";

class SettingPage extends Component {

    state = {
        user: {
            userName: "John Doe",
            birthYear: {
                value: "1900",
                maxYear: new Date().getFullYear() - 14,
                valid: true,
                errorMessage: "invalid age",
                id: "birthYear"
            },
            gender: "male",
            email: "test@mail.ru",
            password: "123456"
        }
    }

    render() {
        const {userName, birthYear, gender, email, password} = this.state.user;
        return (
            <div className="setting__page">
                <div className="setting__profile">
                    <h1>{userName}</h1>
                    <h2>Username</h2>
                    <p>
                        <Input type="text" value={userName}/>
                        <button className="btn">
                            Update
                        </button>
                    </p>
                    <h2>Birth Year</h2>
                    <p>
                        <Input
                            type="number"
                            id={birthYear.id}
                            value={birthYear.value}
                            valid={birthYear.valid}
                            changeHandler={this.handleChange}
                            errorMessage={birthYear.errorMessage}
                        />
                    </p>
                    <h2>Gender</h2>
                    <p>
                        {gender}
                    </p>
                    <h2>Email</h2>
                    <p>
                        <Input type="email" value={email}/>
                        <button className="btn">
                            update
                        </button>
                    </p>
                    <h2>Password </h2>
                    <p>
                        <Input type="password" value={password}/>
                        <button className="btn">
                            Change
                        </button>
                    </p>
                </div>
            </div>
        );
    }
}

export default SettingPage;