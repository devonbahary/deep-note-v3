import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    folder: {
        cursor: 'pointer',
    },
}));

export const FolderListItem = (props) => {
    const { 
        folderIcon: FolderIcon,
        onClick,
        primaryText,
        secondaryText,
    } = props;
    
    const classes = useStyles();

    return (
        <>
            <ListItem className={classes.folder} onClick={onClick}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primaryText} secondary={secondaryText} />
            </ListItem>
            <Divider />
        </>
    );
};