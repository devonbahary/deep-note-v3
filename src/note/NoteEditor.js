import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { styled } from '@material-ui/core';
import { ApiUtil } from '../utilities/ApiUtil';
import { useDebounce } from '../utilities/react-hooks';
import 'react-quill/dist/quill.snow.css'; 

const modules = {
    clipboard: {
        matchVisual: false, // https://stackoverflow.com/questions/43748108/how-to-keep-quill-from-inserting-blank-paragraphs-pbr-p-before-heading
    },
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [ 'blockquote', 'code-block' ],
        [ 'link' ],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['clean'] 
    ],
};

const StyledReactQuill = styled(ReactQuill)(({ theme }) => ({
    color: theme.palette.text.primaryDark,
    '&.quill': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    '&.quill .ql-toolbar.ql-snow': {
        border: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '&.quill .ql-container.ql-snow': {
        flex: 1,
        border: 'none',
        fontFamily: 'inherit',
        fontSize: '16px',
        overflowY: 'scroll',
    },
}));

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
        <StyledReactQuill 
            modules={modules}
            onChange={handleChange}
            placeholder="Write your note.."
            value={content}
        />
    );
};