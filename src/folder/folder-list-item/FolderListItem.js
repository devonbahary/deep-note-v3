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
import FolderIcon from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/core/styles';
import { RouterUtil } from '../../utilities/RouterUtil';
import { ApiUtil } from '../../utilities/ApiUtil';
import { FolderListItemMenu } from './FolderListItemMenu';

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
export const FolderListItem = ({ folder, updateChildFolder, deleteChildFolder }) => {
    const { uuid, name } = folder;

    const history = useHistory();

    const navigateToFolder = () => {
        if (isLoading) return;
        RouterUtil.goToFolder(history, uuid);
    }

    const [ menuAnchorEl, setMenuAnchorEl ] = useState(null);
    const openMenu = (e) => setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const [ folderRenameText, setFolderRenameText ] = useState(null);

    const isRenaming = folderRenameText !== null;

    const handleMenuRename = () => {
        closeMenu();
        setTimeout(() => setFolderRenameText(name || ''), 1);
    };

    const handleMenuDelete = async () => {
        setIsLoading(true);
        await ApiUtil.deleteFolder(uuid);
        deleteChildFolder(uuid);
        setIsLoading(false);
    };

    const [ isLoading, setIsLoading ] = useState(false);

    const handleFolderRenameChange = (e) => setFolderRenameText(e.target.value);
    const handleFolderRenameBlur = async () => {
        setFolderRenameText(null);
        if (folderRenameText === name) return;
        setIsLoading(true);
        const folder = await ApiUtil.updateFolder(uuid, folderRenameText);
        updateChildFolder(uuid, folder);
        setIsLoading(false);
    };
    const handleFolderRenameKeypress = (e) => {
        if (e.key === 'Enter') handleFolderRenameBlur();
    };

    const handleBackdropClick = () => setFolderRenameText(null);
    
    const classes = useStyles();

    const secondaryText = getSecondaryText(folder);

    return (
        <>
            <ListItem className={classes.folder} divider>
                <ListItemAvatar>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Avatar onClick={navigateToFolder}>
                            <FolderIcon />
                        </Avatar>
                    )}
                </ListItemAvatar>
                {isRenaming ? (
                    <TextField 
                        autoFocus 
                        fullWidth
                        label="name"
                        onBlur={handleFolderRenameBlur}
                        onChange={handleFolderRenameChange}
                        onKeyPress={handleFolderRenameKeypress}
                        placeholder="folder name"
                        value={folderRenameText}
                        variant="outlined"
                    />
                ) : (
                    <ListItemText 
                        onClick={navigateToFolder} 
                        primary={name || 'untitled'} 
                        secondary={secondaryText} 
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