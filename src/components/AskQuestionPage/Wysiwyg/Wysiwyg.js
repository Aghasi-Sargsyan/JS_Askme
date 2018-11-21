import React, { Component } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import './Wysiwyg.scss';

class Wysiwyg extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editorHtml: '',
            theme: 'snow'
        }
    }

    handleChange = (html) => {
        this.setState({ editorHtml: html });
    }

    handleThemeChange = (newTheme) => {
        if (newTheme === "core") {
            newTheme = null;
        }
        this.setState({ theme: newTheme })
    }

    render() {
        console.log(this.state.editorHtml)
        return (
            <div className='app'>
                <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={Wysiwyg.modules}
                    formats={Wysiwyg.formats}
                    bounds={'.app'}
                    placeholder={this.props.placeholder}
                />
                <div className="themeSwitcher">
                    <label>Theme </label>
                    <select onChange={(e) =>
                        this.handleThemeChange(e.target.value)}>
                        <option value="snow">Snow</option>
                        <option value="bubble">Bubble</option>
                        <option value="core">Core</option>
                    </select>
                </div>
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