import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { makeStyles } from '@material-ui/core/styles';

// TODO: how to share with FolderListItem
const useStyles = makeStyles(() => ({
    folder: {
        cursor: 'pointer',
    },
}));

export const AddFolderListItem = ({ onClick }) => {
    const classes = useStyles();

    return (
        <ListItem className={classes.folder} divider onClick={onClick}>
            <ListItemAvatar>
                <Avatar>
                    <CreateNewFolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Add folder' />
        </ListItem>
    );
};