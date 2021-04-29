import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/core/styles';
import { RouterUtil } from '../utilities/RouterUtil';

const useStyles = makeStyles(() => ({
    folder: {
        cursor: 'pointer',
    },
}));

export const FolderListItem = ({ folder }) => {
    const { uuid, name, updated_at } = folder;

    const history = useHistory();

    const formattedUpdatedAt = new Date(updated_at).toLocaleString();
    const navigateToFolder = () => RouterUtil.goToFolder(history, uuid);

    const classes = useStyles();

    return (
        <>
            <ListItem className={classes.folder} onClick={navigateToFolder}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name || 'untitled'} secondary={formattedUpdatedAt} />
            </ListItem>
            <Divider />
        </>
    );
};