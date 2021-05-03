import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import NoteIcon from '@material-ui/icons/Note';
import { makeStyles } from '@material-ui/core/styles';
import { RouterUtil } from '../utilities/RouterUtil';
import { ApiUtil } from '../utilities/ApiUtil';
import { FolderListItemMenu } from './folder-list-item/FolderListItemMenu';

// TODO: how to share with AddFolderListItem
const useStyles = makeStyles(() => ({
    folder: {
        cursor: 'pointer',
    },
    backdrop: {
        zIndex: '1',
    }
}));

const getSecondaryText = (folder) => {
    const { updated_at, child_folder_count } = folder;
    let secondaryText = ``;
    if (child_folder_count) {
        secondaryText += `${child_folder_count} folder`
        if (child_folder_count > 1) secondaryText += `s`;
        secondaryText += ` | `;
    }

    const formattedUpdatedAt = DateTime.fromISO(updated_at.replace(/\.000Z$/g, '')).toRelative();
    secondaryText += formattedUpdatedAt;
    
    return secondaryText;
};

// TODO: confirm want delete, include # of children in confirm
export const NoteListItem = ({ note, updateChildNote, deleteChildNote }) => {
    const { id, name, text } = note;

    const history = useHistory();

    // const navigateToNote = () => {
    //     if (isLoading) return;
    //     RouterUtil.goToFolder(history, uuid);
    // }

    const [ menuAnchorEl, setMenuAnchorEl ] = useState(null);
    const openMenu = (e) => setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const [ noteRenameText, setNoteRenameText ] = useState(null);

    const isRenaming = noteRenameText !== null;

    const handleMenuRename = () => {
        closeMenu();
        setTimeout(() => setNoteRenameText(name || ''), 1);
    };

    const handleMenuDelete = async () => {
        setIsLoading(true);
        await ApiUtil.deleteNote(id);
        deleteChildNote(id);
        setIsLoading(false);
    };

    const [ isLoading, setIsLoading ] = useState(false);

    const handleNoteRenameChange = (e) => setNoteRenameText(e.target.value);
    const handleNoteRenameBlur = async () => {
        setNoteRenameText(null);
        if (noteRenameText === name) return;
        setIsLoading(true);
        const note = await ApiUtil.updateNote(id, noteRenameText);
        updateChildNote(id, note);
        setIsLoading(false);
    };
    const handleNoteRenameKeypress = (e) => {
        if (e.key === 'Enter') handleNoteRenameBlur();
    };

    const handleBackdropClick = () => setNoteRenameText(null);
    
    const classes = useStyles();

    // const secondaryText = getSecondaryText(folder);

    return (
        <>
            <ListItem className={classes.folder} divider>
                <ListItemAvatar>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        /* <Avatar onClick={navigateToFolder}> */
                        <Avatar onClick={() => {}}>
                            <NoteIcon />
                        </Avatar>
                    )}
                </ListItemAvatar>
                {isRenaming ? (
                    <TextField 
                        autoFocus 
                        fullWidth
                        label="name"
                        onBlur={handleNoteRenameBlur}
                        onChange={handleNoteRenameChange}
                        onKeyPress={handleNoteRenameKeypress}
                        placeholder="note name"
                        value={noteRenameText}
                        variant="outlined"
                    />
                ) : (
                    <ListItemText 
                        // onClick={navigateToFolder} 
                        primary={name || 'untitled'} 
                        // secondary={secondaryText} 
                    />
                )}
                {!isLoading && (
                    <FolderListItemMenu 
                        closeMenu={closeMenu}
                        handleMenuDelete={handleMenuDelete}
                        handleMenuRename={handleMenuRename}
                        menuAnchorEl={menuAnchorEl}
                        openMenu={openMenu}
                    />
                )}
            </ListItem>
            <Backdrop 
                className={classes.backdrop}
                invisible
                onClick={handleBackdropClick}
                open={isRenaming} 
            />
        </>
    );
};