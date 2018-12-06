import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import './Wysiwyg.scss';

function Wysiwyg(props) {

    return (
        <div className='wysiwyg'>
            <ReactQuill
                // value={props.value}
                onChange={props.changeHandler}
                modules={Wysiwyg.modules}
                formats={Wysiwyg.formats}
            />
        </div>
    )
}

// Quill modules to attach to editor
Wysiwyg.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
};

// Quill editor formats

Wysiwyg.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];


// PropType validation
Wysiwyg.propTypes = {
    placeholder: PropTypes.string,
};

export default Wysiwyg;