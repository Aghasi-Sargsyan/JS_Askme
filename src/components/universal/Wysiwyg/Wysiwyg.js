import React, { Component } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import './Wysiwyg.scss';

class Wysiwyg extends Component{
    constructor(props) {
        super(props);

        this.state = {
            editorHtml: '',
        }
    }

    handleChange = (html) => {
        this.setState({editorHtml: html});
    };

    render() {
        // console.log(this.state.editorHtml);
        return (
            <div className='app'>
                <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={Wysiwyg.modules}
                    formats={Wysiwyg.formats}
                />
            </div>
        )
    }
}

// Quill modules to attach to editor
Wysiwyg.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

// Quill editor formats

Wysiwyg.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]


// PropType validation
Wysiwyg.propTypes = {
    placeholder: PropTypes.string,
}


export default Wysiwyg;