import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './note-editor.css';
import { ApiUtil } from '../utilities/ApiUtil';

export const NoteEditor = ({ note }) => {
    const { uuid } = useParams();

    const [ content, setContent ] = useState(note.text);
    const reactQuillRef = useRef();

    const handleChange = async (content, delta, source, editor) => {
        setContent(content);
        await ApiUtil.updateNoteText(uuid, editor.getHTML());
    }

    return (
        <ReactQuill 
            ref={reactQuillRef}
            onChange={handleChange}
            value={content}
        />
    );
};