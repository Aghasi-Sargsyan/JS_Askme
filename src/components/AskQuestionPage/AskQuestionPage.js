import React, { Component } from "react";
import Wysiwyg from '../universal/Wysiwyg/Wysiwyg';
import Input from "../universal/Input/Input";

class AskQuestionPage extends Component {

    state = {
        title: "",
        description: ""
    };


    handleInput = (e) => {
        console.log(e.target);

        this.setState({

        })
    };

    render() {
        return (
            <div>
                <h1>Ask a question</h1>
                <div>
                    <Input label="Title" onChange={this.handleInput} id="title" value={this.state.title}/>
                </div>
                <div className='am--flex'>
                    <Wysiwyg/>
                </div>
                <div>
                    <Input label="Tags" onChange={this.handleInput} id="tags" />
                </div>
                <button>Post Your Question</button>
            </div>
        );
    }
}

export default AskQuestionPage;