import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FolderListItemMenu } from './folder-list-item/FolderListItemMenu';

const useStyles = makeStyles(() => ({
    root: {
        cursor: 'pointer',
    },
    backdrop: {
        zIndex: 1,
    },
}));

export const FolderChildListItem = (props) => {
    const {
        isLoading,
        isRenaming,
        AvatarIcon,
        avatarOnClick,
        handleMenuDelete,
        handleMenuRename,
        onBlur,
        onChange,
        onKeyPress,
        placeholder,
        value,
        onClick,
        primaryText,
        secondaryText,
        openMenu,
        closeMenu,
        menuAnchorEl,
        clearRenameText,
    } = props;

    const classes = useStyles();

    return (
        <>
            <ListItem className={classes.root} divider>
                <ListItemAvatar>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Avatar onClick={avatarOnClick}>
                            <AvatarIcon />
                        </Avatar>
                    )}
                </ListItemAvatar>
                {isRenaming ? (
                    <TextField 
                        autoFocus 
                        fullWidth
                        label="name"
                        onBlur={onBlur}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                        placeholder={placeholder}
                        value={value}
                        variant="outlined"
                    />
                ) : (
                    <ListItemText 
                        onClick={onClick} 
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
                onClick={clearRenameText}
                open={isRenaming}
            />
        </>
    );
};