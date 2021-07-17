import React, { useEffect, useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
import NoteIcon from '@material-ui/icons/Note';
import { AppBar } from '../../common/AppBar';
import { Content } from '../../common/Content';
import { FolderChildFolder } from './FolderChildFolder';
import { FolderChildNote } from './FolderChildNote';
import { ApiUtil } from '../../utilities/ApiUtil';
import { FormatUtil } from '../../utilities/FormatUtil';
import { RouterUtil } from '../../utilities/RouterUtil';
import { reducer, initialState } from '../reducer';
import { addChildFolder, addChildNote, setFolder, setIsLoading } from '../actions';
import { AddNewItemDialog } from './AddNewItemDialog';

const StyledFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
}));

export const Folder = () => {
    const { uuid } = useParams();
    const history = useHistory();

    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    const [ menuAnchorEl, setMenuAnchorEl ] = useState(null);
    const openMenu = (e) => setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const [ creatingNewNote, setCreatingNewNote ] = useState(false);
    const [ creatingNewFolder, setCreatingNewFolder ] = useState(false);
    
    const closeCreating = () => {
        setCreatingNewNote(false);
        setCreatingNewFolder(false);
        setMenuAnchorEl(null);
    };

    const { folder, childFolders, childNotes, isLoading } = state;

    useEffect(() => {
        const getFolder = async () => {
            const folder = await ApiUtil.getFolder(uuid);
            dispatch(setFolder(folder));
        }

        getFolder();
    }, [ uuid ]);

    const onAddNewItem = async (name) => {
        dispatch(setIsLoading(true));
        
        if (creatingNewNote) {
            const newNote = await ApiUtil.createNote(uuid, name || 'untitled');
            dispatch(addChildNote(newNote));
        } else if (creatingNewFolder) {
            const newFolder = await ApiUtil.createFolder(uuid, name || 'untitled');
            dispatch(addChildFolder(newFolder));
        } else {
            throw new Error(`shouldn't get here`);
        }
        
        closeCreating();
        dispatch(setIsLoading(false));
    };

    if (!folder) return null;

    const goBackFn = folder.parent_folder_uuid ? () => RouterUtil.goToFolder(history, folder.parent_folder_uuid) : null;

    const title = FormatUtil.getFolderName(folder);

    return (
        <>
            <AppBar goBackFn={goBackFn} title={title} />
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
                    {!isLoading && (
                        <>
                            <StyledFab color="primary" onClick={openMenu}>
                                <AddIcon />
                            </StyledFab>
                            <Menu anchorEl={menuAnchorEl} onClose={closeMenu} open={Boolean(menuAnchorEl)}>
                                <MenuItem onClick={() => setCreatingNewFolder(true)}>
                                    <ListItemIcon>
                                        <FolderIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Add new folder" />
                                </MenuItem>
                                <MenuItem onClick={() => setCreatingNewNote(true)}>
                                    <ListItemIcon>
                                        <NoteIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Add new note" />
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                    <AddNewItemDialog />
                </List>
                <AddNewItemDialog 
                    label={
                        creatingNewFolder 
                            ? 'Add New Folder' 
                            : creatingNewNote 
                                ? 'Add New Note'
                                : ''
                    }
                    open={creatingNewFolder || creatingNewNote}
                    onSubmit={onAddNewItem}
                    onClose={closeCreating}
                />
            </Content>
        </>
    );
};