import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { ApiUtil } from '../utilities/ApiUtil';
import { useDebounce } from '../utilities/react-hooks';
import 'react-quill/dist/quill.snow.css'; 
import './note-editor.css';

export const NoteEditor = ({ note }) => {
    const { uuid } = useParams();

    const [ content, setContent ] = useState(note.text);
    const editorHTMLRef = useRef();

    const saveNoteText = () => ApiUtil.updateNoteText(uuid, editorHTMLRef.current);
    const debouncedSaveNoteText = useDebounce(saveNoteText, 100);
    
    useEffect(() => {
        if (editorHTMLRef.current) debouncedSaveNoteText();
    }, [ content ]);

    const handleChange = async (content, delta, source, editor) => {
        setContent(content);
        editorHTMLRef.current = editor.getHTML();
    }

    return (
        <ReactQuill 
            onChange={handleChange}
            value={content}
        />
    );
};