import React, { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { AppBar } from '../../common/AppBar';
import { Content } from '../../common/Content';
import { FolderChildFolder } from './FolderChildFolder';
import { FolderChildNote } from './FolderChildNote';
import { ApiUtil } from '../../utilities/ApiUtil';
import { FormatUtil } from '../../utilities/FormatUtil';
import { RouterUtil } from '../../utilities/RouterUtil';
import { reducer, initialState } from '../reducer';
import { addChildFolder, addChildNote, setFolder, setIsLoading } from '../actions';

export const Folder = () => {
    const { uuid } = useParams();
    const history = useHistory();

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const { folder, childFolders, childNotes, isLoading } = state;

    useEffect(() => {
        const getFolder = async () => {
            const folder = await ApiUtil.getFolder(uuid);
            dispatch(setFolder(folder));
        }

        getFolder();
    }, [ uuid ]);

    const addNewFolder = async () => {
        dispatch(setIsLoading(true));
        const newFolder = await ApiUtil.createFolder(uuid);
        dispatch(addChildFolder(newFolder));
        dispatch(setIsLoading(false));
    }

    const addNewNote = async () => {
        dispatch(setIsLoading(true));
        const newNote = await ApiUtil.createNote(uuid);
        dispatch(addChildNote(newNote));
        dispatch(setIsLoading(false));
    }

    if (!folder) return null;

    const goBackFn = folder.parent_folder_uuid ? () => RouterUtil.goToFolder(history, folder.parent_folder_uuid) : null;

    const title = FormatUtil.getFolderName(folder);

    return (
        <>
            <AppBar goBackFn={goBackFn} title={title}>
                {!isLoading && (
                    <>
                        <IconButton color="inherit" onClick={addNewFolder}>
                            <CreateNewFolderIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={addNewNote}>
                            <NoteAddIcon />
                        </IconButton>
                    </>
                )}
            </AppBar>
            <Content>
                <List>
                    {childFolders.map(childFolder => 
                        <FolderChildFolder
                            key={childFolder.uuid} 
                            dispatch={dispatch}
                            folder={childFolder} 
                            parentFolder={folder}
                            siblingFolders={childFolders}
                        /> 
                    )}
                    {childNotes.map(note => 
                        <FolderChildNote 
                            key={note.uuid}
                            dispatch={dispatch}
                            note={note}
                            parentFolder={folder}
                            siblingFolders={childFolders}
                        />
                    )}
                </List>    
            </Content>
        </>
    );
};