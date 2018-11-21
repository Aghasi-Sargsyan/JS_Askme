import React, { Component } from "react";
import Wysiwyg from './Wysiwyg/Wysiwyg';

class AskQuestionPage extends Component {

    render() {
        return (
            <div>
                <h1>Ask a question</h1>
                <div>
                    <p>Title</p>
                    <input type='text' />
                </div>
                <div className='am--flex'>
                    <Wysiwyg />
                </div>
            </div>
        );
    }
}

export default AskQuestionPage;