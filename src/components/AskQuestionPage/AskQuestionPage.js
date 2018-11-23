import React, {Component} from "react";
import Wysiwyg from '../universal/Wysiwyg/Wysiwyg';
import Input from "../universal/Input/Input";

class AskQuestionPage extends Component {

    state = {
        title: "",
        description: "",
        skills: ""
    };


    handleChange = (e) => {
        if (typeof e === "string") {
            this.setState({
                description: e
            });
        } else {
            this.setState({
                [e.target.id]: e.target.value
            });
        }
    };

    onSubmit(e) {
        e.preventDefault();


    }

    render() {
        return (
            <div>
                <h1>Ask a question</h1>
                <div>
                    <Input label="Title" changeHandler={this.handleChange} id="title" value={this.state.title}/>
                </div>
                <div className='am--flex'>
                    <Wysiwyg changeHandler={this.handleChange}/>
                </div>
                <div>
                    <Input label="Skills" value={this.state.skills} changeHandler={this.handleChange} id="skills"/>
                </div>
                <button onChange={this.onSubmit}>Post Your Question</button>
            </div>
        );
    }
}

export default AskQuestionPage;