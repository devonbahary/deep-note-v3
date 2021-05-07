import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import FolderIcon from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/core/styles';
import { FolderListItemMenu } from './FolderListItemMenu';
import { ApiUtil } from '../../utilities/ApiUtil';
import { FormatUtil } from '../../utilities/FormatUtil';
import { RouterUtil } from '../../utilities/RouterUtil';

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
    const { updated_at, child_folder_count, child_note_count } = folder;
    
    let secondaryText = ``;
    
    if (child_folder_count) {
        secondaryText += `${child_folder_count} folder`
        if (child_folder_count > 1) secondaryText += `s`;
        secondaryText += ` | `;
    }
    
    if (child_note_count) {
        secondaryText += `${child_note_count} note`
        if (child_note_count > 1) secondaryText += `s`;
        secondaryText += ` | `;
    }

    secondaryText += FormatUtil.getRelativeTimeFromMySQLTime(updated_at);
    
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

    const primaryText = FormatUtil.getFolderName(folder);
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
                        primary={primaryText} 
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