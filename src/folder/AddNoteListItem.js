import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import QueueIcon from '@material-ui/icons/Queue';
import { makeStyles } from '@material-ui/core/styles';

// TODO: how to share with FolderListItem
const useStyles = makeStyles(() => ({
    folder: {
        cursor: 'pointer',
    },
}));

export const AddNoteListItem = ({ onClick }) => {
    const classes = useStyles();

    return (
        <ListItem className={classes.folder} divider onClick={onClick}>
            <ListItemAvatar>
                <Avatar>
                    <QueueIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Add note' />
        </ListItem>
    );
};