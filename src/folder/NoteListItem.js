import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import NoteIcon from '@material-ui/icons/Note';
import { makeStyles } from '@material-ui/core/styles';
import { FolderListItemMenu } from './folder-list-item/FolderListItemMenu';
import { ApiUtil } from '../utilities/ApiUtil';
import { FormatUtil } from '../utilities/FormatUtil';
import { RouterUtil } from '../utilities/RouterUtil';

// TODO: how to share with AddFolderListItem
const useStyles = makeStyles(() => ({
    note: {
        cursor: 'pointer',
    },
    backdrop: {
        zIndex: '1',
    }
}));

// TODO: confirm want delete, include # of children in confirm
export const NoteListItem = ({ note, updateChildNote, deleteChildNote }) => {
    const { uuid, name, updated_at } = note;

    const history = useHistory();

    const navigateToNote = () => {
        if (isLoading) return;
        RouterUtil.goToNote(history, uuid);
    }

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
        await ApiUtil.deleteNote(uuid);
        deleteChildNote(uuid);
        setIsLoading(false);
    };

    const [ isLoading, setIsLoading ] = useState(false);

    const handleNoteRenameChange = (e) => setNoteRenameText(e.target.value);
    const handleNoteRenameBlur = async () => {
        setNoteRenameText(null);
        if (noteRenameText === name) return;
        setIsLoading(true);
        const note = await ApiUtil.updateNoteName(uuid, noteRenameText);
        updateChildNote(uuid, note);
        setIsLoading(false);
    };
    const handleNoteRenameKeypress = (e) => {
        if (e.key === 'Enter') handleNoteRenameBlur();
    };

    const handleBackdropClick = () => setNoteRenameText(null);
    
    const classes = useStyles();

    const primaryText = FormatUtil.getName(note);
    const secondaryText = FormatUtil.getRelativeTimeFromMySQLTime(updated_at);

    return (
        <>
            <ListItem className={classes.note} divider>
                <ListItemAvatar>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Avatar onClick={navigateToNote}>
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
                        onClick={navigateToNote} 
                        primary={primaryText} 
                        secondary={secondaryText} // TODO: reintroduce getSecondaryText and add text.length?
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