import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
import NoteIcon from '@material-ui/icons/Note';
import { AddNewItemDialog } from './AddNewItemDialog';
import { ApiUtil } from '../../../utilities/ApiUtil';
import { 
    addChildFolder,
    addChildNote,
    setIsLoading,
} from '../../actions';

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

export const AddNewItemFab = ({ currentFolderUUID, dispatch }) => {
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

    const onAddNewItem = async (name) => {
        dispatch(setIsLoading(true));
        
        if (creatingNewNote) {
            const newNote = await ApiUtil.createNote(currentFolderUUID, name || 'untitled');
            dispatch(addChildNote(newNote));
        } else if (creatingNewFolder) {
            const newFolder = await ApiUtil.createFolder(currentFolderUUID, name || 'untitled');
            dispatch(addChildFolder(newFolder));
        } else {
            throw new Error(`shouldn't get here`);
        }
        
        closeCreating();
        dispatch(setIsLoading(false));
    };

    return (
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
        </>
    );
};