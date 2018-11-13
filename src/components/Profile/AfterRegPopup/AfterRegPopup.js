import React from "react";
import "./AfterRegPopup.css";
import Input from "../../universal/Input/Input";

class AfterRegPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            birthYear: {
                defaultValue: "1900",
                maxYear: new Date().getFullYear() - 14,
                valid: true,
                errorMessage: "invalid age",
                id: "birthYear"
            },

            skill: {
                defaultValue: "",
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
        console.log(` year : ${birthYear.defaultValue} \n skills : ${skillList.toString()}\n gender : ${gender}`);
    };

    changeHandler = e => {
        const currentObject = this.state[e.target.id];
        const isValid = this.validate(e.target);
        this.setState({
            [e.target.id]: {
                ...currentObject,
                defaultValue: e.target.value,
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
        const {birthYear, skill} = this.state;
        const value = target.value;
        switch (target.id) {
            case birthYear.id:
                return value >= 1900 && value <= birthYear.maxYear;
            case skill.id:
                return !(value && value.length < 2);
            default:
        }
    }

    addSkill = () => {
        const {skillList, skill} = this.state;

        skill.valid &&
        this.setState({
            skillList: [...skillList, skill.defaultValue],
            skill: {...skill, defaultValue: ""}
        });
    };

    skillsRender() {
        return this.state.skillList.map((skill, index) => (
            <li key={index}>{skill}</li>
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
                        value={birthYear.defaultValue}
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
                               value={skill.defaultValue}
                               onChange={this.changeHandler}
                        />
                        <button
                            type="button"
                            className="bioForm__add"
                            onClick={this.addSkill}
                            disabled={!skill.defaultValue || !skill.valid}
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

export default AfterRegPopup;
