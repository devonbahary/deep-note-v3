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
import { FolderChildListItem } from './FolderChildListItem';
import { AddNewItemDialog } from './AddNewItemDialog';
import { ApiUtil } from '../../utilities/ApiUtil';
import { FormatUtil } from '../../utilities/FormatUtil';
import { RouterUtil } from '../../utilities/RouterUtil';
import { reducer, initialState } from '../reducer';
import { 
    addChildFolder,
    addChildNote,
    deleteChildFolder,
    deleteChildNote,
    setFolder,
    setIsLoading,
    updateChildFolder, 
    updateChildNote, 
} from '../actions';

const StyledFab = styled(Fab)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
    },
    '& .MuiSvgIcon-root': {
        fill: theme.palette.text.primary,
    },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        fill: theme.palette.text.primary,
    },
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

    // TODO: don't delete a folder without verifying its contents / size of contents
    return (
        <>
            <AppBar goBackFn={goBackFn} title={title} />
            <Content>
                <List>
                    {childFolders.map(childFolder => {
                        const primaryText = FormatUtil.getFolderName(childFolder);
                        const secondaryText = FormatUtil.getFolderSecondaryText(childFolder);

                        return (
                            <FolderChildListItem 
                                key={childFolder.uuid}
                                AvatarIcon={FolderIcon}
                                deleteChildApi={ApiUtil.deleteFolder}
                                deleteChildState={deleteChildFolder}
                                dispatch={dispatch}
                                item={childFolder}
                                navigateFn={RouterUtil.goToFolder}
                                parentFolder={folder}
                                placeholder="folder name"
                                primaryText={primaryText}
                                reparentChildApi={ApiUtil.reparentFolder}
                                secondaryText={secondaryText}
                                siblingFolders={childFolders}
                                type="folder"
                                updateChildApi={ApiUtil.updateFolderName}
                                updateColorApi={ApiUtil.updateFolderColor}
                                updateChildState={updateChildFolder}
                            />      
                        );
                    })}
                    {childNotes.map(note => {
                        const primaryText = FormatUtil.getName(note);
                        const secondaryText = FormatUtil.getRelativeTimeFromMySQLTime(note.updated_at);

                        return (
                            <FolderChildListItem
                                key={note.uuid}
                                AvatarIcon={NoteIcon}
                                deleteChildApi={ApiUtil.deleteNote}
                                deleteChildState={deleteChildNote}
                                dispatch={dispatch}
                                item={note}
                                navigateFn={RouterUtil.goToNote}
                                parentFolder={folder}
                                placeholder="note name"
                                primaryText={primaryText}
                                reparentChildApi={ApiUtil.reparentNote}
                                secondaryText={secondaryText}
                                siblingFolders={childFolders}
                                type="note"
                                updateChildApi={ApiUtil.updateNoteName}
                                updateColorApi={ApiUtil.updateNoteColor}
                                updateChildState={updateChildNote}
                            />
                        );
                    })}
                    {!isLoading && (
                        <>
                            <StyledFab onClick={openMenu}>
                                <AddIcon />
                            </StyledFab>
                            <Menu anchorEl={menuAnchorEl} onClose={closeMenu} open={Boolean(menuAnchorEl)}>
                                <MenuItem onClick={() => setCreatingNewFolder(true)}>
                                    <StyledListItemIcon>
                                        <FolderIcon />
                                    </StyledListItemIcon>
                                    <ListItemText primary="Add new folder" />
                                </MenuItem>
                                <MenuItem onClick={() => setCreatingNewNote(true)}>
                                    <StyledListItemIcon>
                                        <NoteIcon />
                                    </StyledListItemIcon>
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