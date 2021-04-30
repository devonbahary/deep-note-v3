import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVert from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import { RouterUtil } from '../utilities/RouterUtil';
import { ApiUtil } from '../utilities/ApiUtil';

// TODO: how to share with AddFolderListItem
const useStyles = makeStyles(() => ({
    folder: {
        cursor: 'pointer',
    },
    backdrop: {
        zIndex: '1',
    }
}));

export const FolderListItem = ({ folder }) => {
    const { uuid, name, updated_at } = folder;

    const history = useHistory();

    const formattedUpdatedAt = new Date(updated_at).toLocaleString();
    const navigateToFolder = () => RouterUtil.goToFolder(history, uuid);

    const [ menuAnchorEl, setMenuAnchorEl ] = useState(null);
    const openMenu = (e) => setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const [ folderRenameText, setFolderRenameText ] = useState(null);

    const isRenaming = folderRenameText !== null;

    const handleMenuRename = () => {
        closeMenu();
        setTimeout(() => setFolderRenameText(name || ''), 1);
    };

    const handleFolderRenameChange = (e) => setFolderRenameText(e.target.value);
    const handleFolderRenameBlur = async () => {
        folder.name = folderRenameText;
        folder.updated_at = new Date();
        setFolderRenameText(null);
        await ApiUtil.updateFolder(uuid, folder.name)
    };
    const handleFolderRenameKeypress = (e) => {
        if (e.key === 'Enter') handleFolderRenameBlur();
    };

    const handleBackdropClick = () => setFolderRenameText(null);
    
    const classes = useStyles();

    return (
        <>
            <ListItem className={classes.folder} divider onClick={navigateToFolder}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
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
                    <ListItemText primary={name || 'untitled'} secondary={formattedUpdatedAt} />
                )}
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={openMenu}>
                        <MoreVert />
                    </IconButton>
                    <Menu onClose={closeMenu} open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl}>
                        <MenuItem onClick={handleMenuRename}>Rename</MenuItem>
                    </Menu>
                </ListItemSecondaryAction>
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