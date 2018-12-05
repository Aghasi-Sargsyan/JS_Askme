import React, {Component} from "react";
import "./AfterRegPopup.scss";
import Input from "../../universal/Input/Input";
import FireManager from "../../../firebase/FireManager";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import userImg from "../../../assets/icons/user.png";
import male from "../../../assets/icons/male.png";
import female from "../../../assets/icons/female.png";
import {bindActionCreators} from "redux";
import {actionAddUserData} from "../../../redux/actions/userActions";

class AfterRegPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            birthYear: {
                value: 1900,
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
        const {user} = this.props;
        const updatedUser = {
            age: Number.parseInt(birthYear.value),
            gender: gender,
            skills: skillList,
            skills_insensitive: skillList.map(skill => skill.value.toUpperCase()),
            isNewUser: false
        };
        FireManager.updateUser(updatedUser, user.id);

        this.props.dispatchUser({
            ...updatedUser,
            age: new Date().getFullYear() - birthYear.value
        });

        const skills = skillList.map(skill => skill.value);
        FireManager.addGlobalSkill(...skills);
    };

    handleChange = e => {
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

    handleCheck = (e) => {
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

  handleKeyPress = (e) => {
    if (e.charCode == 13) {
      e.preventDefault();
    }
  };
    render() {
        const {skill, skillList, birthYear} = this.state;

        return (
            <div className='modal_wrapper'>
                <div className='bioform flex'>
                    <div className='bioForm__left'>
                        <div className='bioForm__logo'>
                            <p className='font_m'><span className='logo_letter'>A</span>sk<span
                                className='logo_letter'>M</span>e</p>
                            <div className='tac'>
                                <img src={userImg} alt="user"/>
                                <button
                                    type="submit"
                                    className="bioform__submit"
                                >
                                    Add a photo
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bioForm__right">
                        <form className="bioForm__form" onSubmit={this.handleSubmit}>
                            <Input
                                type="number"
                                label="Birth Year"
                                id={birthYear.id}
                                value={birthYear.value}
                                valid={birthYear.valid}
                                changeHandler={this.handleChange}
                                errorMessage={birthYear.errorMessage}
                            />
                            <div className='gender'>
                                <span>Gender</span>
                                <label>
                                    {/* Male */}
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
                                    {/* Female */}
                                    <input type="radio"
                                           name="genderGroup"
                                           value="Female"
                                           id="radioFemale"
                                           onChange={this.handleCheck}
                                    />
                                    <img src={female} alt="female"/>

                                </label>
                            </div>
                            <div className="skills-cont">
                                <Input
                                    label="Skills"
                                    placeholder="Your skills"
                                    id={skill.id}
                                    valid={skill.valid}
                                    errorMessage={skill.errorMessage}
                                    value={skill.value}
                                    changeHandler={this.handleChange}
                                    handleKeyPress={this.handleKeyPress}
                                />

                                <button
                                    type="button"
                                    className="bioForm__add"
                                    onClick={this.addSkill}
                                    disabled={!skill.value || !skill.valid}
                                >
                                    +
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.userReducer}
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUser: bindActionCreators(actionAddUserData, dispatch)
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AfterRegPopup));
