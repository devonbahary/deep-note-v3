import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import { AppBar } from '../common/AppBar';
import { Content } from '../common/Content';
import { AddFolderListItem } from './AddFolderListItem';
import { FolderListItem } from './folder-list-item/FolderListItem';
import { NoteListItem } from './NoteListItem';
import { AddNoteListItem } from './AddNoteListItem';
import { ApiUtil } from '../utilities/ApiUtil';
import { FormatUtil } from '../utilities/FormatUtil';
import { RouterUtil } from '../utilities/RouterUtil';

export const Folder = () => {
    const { uuid } = useParams();
    const history = useHistory();

    const [ folder, setFolder ] = useState(null);
    const [ childFolders, setChildFolders ] = useState([]);
    const [ childNotes, setChildNotes ] = useState([]);

    useEffect(() => {
        const getFolder = async () => {
            const { folder, childFolders, childNotes } = await ApiUtil.getFolder(uuid);
            setFolder(folder);
            setChildFolders(childFolders);
            setChildNotes(childNotes);
        }

        getFolder();
    }, [ uuid ]);

    // TODO: useReducer?
    const [ isAddingNewFolder, setIsAddingNewFolder ] = useState(false);
    const addNewFolder = async () => {
        setIsAddingNewFolder(true);
        const newFolder = await ApiUtil.createFolder(uuid);
        setChildFolders([ ...childFolders, newFolder ]);
        setIsAddingNewFolder(false);
    }

    const updateChildFolder = (uuid, folder) => {
        setChildFolders(childFolders.map(f => f.uuid === uuid ? folder : f));
    };

    const deleteChildFolder = (uuid) => {
        setChildFolders(childFolders.filter(f => f.uuid !== uuid));
    };

    const [ isAddingNewNote, setIsAddingNewNote ] = useState(false);
    const addNewNote = async () => {
        setIsAddingNewNote(true);
        const newNote = await ApiUtil.createNote(uuid);
        setChildNotes([ ...childNotes, newNote ]);
        setIsAddingNewNote(false);
    }

    const updateChildNote = (uuid, note) => {
        setChildNotes(childNotes.map(n => n.uuid === uuid ? note : n));
    };

    const deleteChildNote = (uuid) => {
        setChildNotes(childNotes.filter(n => n.uuid !== uuid));
    }; 

    if (!folder) return null;

    const goBackFn = folder.parent_folder_uuid ? () => RouterUtil.goToFolder(history, folder.parent_folder_uuid) : null;

    const title = FormatUtil.getFolderName(folder);

    return (
        <>
            <AppBar goBackFn={goBackFn} title={title} />
            <Content>
                <List>
                    {childFolders.map(folder => 
                        <FolderListItem
                            key={folder.uuid} 
                            folder={folder} 
                            updateChildFolder={updateChildFolder} 
                            deleteChildFolder={deleteChildFolder}
                        /> 
                    )}
                    {!isAddingNewFolder && <AddFolderListItem onClick={addNewFolder} />}
                    {childNotes.map(note => 
                        <NoteListItem 
                            key={note.uuid}
                            note={note}
                            updateChildNote={updateChildNote}
                            deleteChildNote={deleteChildNote}
                        />
                    )}
                    {!isAddingNewNote && <AddNoteListItem onClick={addNewNote} />}
                </List>    
            </Content>
        </>
    );
};