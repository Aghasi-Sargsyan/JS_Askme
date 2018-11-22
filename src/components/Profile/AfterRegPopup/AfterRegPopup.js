import React from "react";
import "./AfterRegPopup.css";
import Input from "../../universal/Input/Input";
import FireManager from "../../../firebase/FireManager";
import localKeys from "../../../constKeys/localKeys";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import rotePaths from "../../../constKeys/rotePaths";

class AfterRegPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            birthYear: {
                value: "1900",
                maxYear: new Date().getFullYear() - 14,
                valid: true,
                errorMessage: "invalid age",
                id: "birthYear"
            },

            skill: {
                value: "",
                valid: true,
                errorMessage: "length should be more then 2 characters",
                id: "skill"
            },
            gender: "male",
            skillList: []
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {birthYear, skillList, gender} = this.state;
        const {authUser, history} = this.props;

        FireManager.updateUser({
            age: birthYear.value,
            gender: gender,
            skills: skillList
        }, authUser.uid);
        localStorage.setItem(localKeys.isNewUser, "false");
        history.push(rotePaths.questionPage);

        const skills = skillList.map(skill => skill.value);
        FireManager.addGlobalSkill(...skills);
    };

    changeHandler = e => {
        const currentObject = this.state[e.target.id];
        const isValid = this.validate(e.target);
        this.setState({
            [e.target.id]: {
                ...currentObject,
                value: e.target.value,
                valid: isValid
            }
        });
    };

    checkHandler = (e) => {
        this.setState({
            gender: e.target.value
        });
    };

    validate(target) {
        const {birthYear, skill, skillList} = this.state;
        const value = target.value;
        switch (target.id) {
            case birthYear.id:
                return value >= 1900 && value <= birthYear.maxYear;
            case skill.id:
                const duplicate = skillList.find(skill => skill.value === value);
                return value && value.length >= 2 && !duplicate;
            default:
        }
    }

    addSkill = () => {
        const {skillList, skill} = this.state;

        skill.valid &&
        this.setState({
            skillList: [...skillList, {value: skill.value, rate: 0}],
            skill: {...skill, value: ""}
        });
    };

    skillsRender() {
        return this.state.skillList.map((skill, index) => (
            <li key={index}>{skill.value}</li>
        ));
    }

    render() {
        const {skill, skillList, birthYear} = this.state;

        return (
            <div className="bioForm">
                <form className="bioForm__form" onSubmit={this.handleSubmit}>
                    <Input
                        type="number"
                        label="Birth Year"
                        id={birthYear.id}
                        value={birthYear.value}
                        valid={birthYear.valid}
                        onChange={this.changeHandler}
                        errorMessage={birthYear.errorMessage}
                    />
                    <div>
                        <span>Gender</span>
                        <label>
                            Male
                            <input
                                type="radio"
                                name="genderGroup"
                                id="radioMale"
                                defaultChecked="true"
                                value="Male"
                                onChange={this.checkHandler}
                            />
                        </label>
                        <label>
                            Female
                            <input type="radio"
                                   name="genderGroup"
                                   value="Female"
                                   id="radioFemale"
                                   onChange={this.checkHandler}
                            />
                        </label>
                    </div>
                    <div className="skills-cont">
                        <Input label="Skill"
                               placeholder="ex. JavaScript"
                               id={skill.id}
                               valid={skill.valid}
                               errorMessage={skill.errorMessage}
                               value={skill.value}
                               onChange={this.changeHandler}
                        />
                        <button
                            type="button"
                            className="bioForm__add"
                            onClick={this.addSkill}
                            disabled={!skill.value || !skill.valid}
                        >
                            add
                        </button>
                    </div>
                    <ul className="skillsList">
                        {this.skillsRender()}
                    </ul>
                    <button
                        className="bioForm__save"
                        type="submit"
                        disabled={!skillList.length || !birthYear.valid}
                    >
                        Save
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {authUser: state.userReducer.authUser}
}

export default withRouter(connect(mapStateToProps)(AfterRegPopup));
