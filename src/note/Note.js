import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AppBar } from '../common/AppBar';
import { Content } from '../common/Content';
import { ApiUtil } from '../utilities/ApiUtil';
import { FormatUtil } from '../utilities/FormatUtil';
import { RouterUtil } from '../utilities/RouterUtil';

export const Note = () => {
    const { id } = useParams();
    const history = useHistory();

    const [ note, setNote ] = useState(null);

    useEffect(() => {
        const getNote = async () => {
            const note = await ApiUtil.getNote(id);
            setNote(note);
        }

        getNote();
    }, [ id ]);

    if (!note) return null;

    const goBackFn = note.parent_folder_uuid ? () => RouterUtil.goToFolder(history, note.parent_folder_uuid) : null;
    
    const title = FormatUtil.getName(note);
    
    return (
        <>
            <AppBar goBackFn={goBackFn} title={title} />
            <Content>

            </Content>
        </>
    );
};