import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'katex/dist/katex.min.css'

export default function ProblemEditor(props) {
    const { description, setDescription } = props;

    // specify toolbar options
    const modules = React.useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', { 'color': [] }, { 'background': [] }],
            ['code-block', 'formula', 'image', 'link', 'blockquote'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['clean'],
        ],
        syntax: true,
        formula: true,        
    }), []);

    return (
        <>
            <ReactQuill theme="snow" value={description} onChange={setDescription}
                modules={modules} placeholder="Write your problem description here" />
        </>
    );
}
