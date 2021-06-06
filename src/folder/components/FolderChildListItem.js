import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FolderChildListItemActions } from './FolderChildListItemActions';

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
        AvatarIcon,
        deleteChildApi,
        deleteChildState,
        dispatch,
        item,
        navigateFn,
        placeholder,
        primaryText,
        secondaryText,
        updateChildApi,
        updateChildState,
    } = props;

    const history = useHistory();

    const [ menuAnchorEl, setMenuAnchorEl ] = useState(null);
    const openMenu = (e) => setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const [ text, setText ] = useState(null);

    const [ isLoading, setIsLoading ] = useState(false);

    const handleChange = (e) => setText(e.target.value);

    const handleBlur = async () => {
        setText(null);
        if (text === item.name) return;
        setIsLoading(true);
        const folderChild = await updateChildApi(item.uuid, text);
        dispatch(updateChildState(folderChild))
        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleBlur();
    };

    const navigateToItem = () => {
        if (isLoading) return;
        navigateFn(history, item.uuid);
    }

    const handleMenuRename = () => {
        closeMenu();
        setTimeout(() => setText(item.name || ''), 1);
    };

    const handleMenuDelete = async () => {
        setIsLoading(true);
        await deleteChildApi(item.uuid);
        dispatch(deleteChildState(item.uuid));
        setIsLoading(false);
    };

    const handleBackdropClick = () => setText(null);

    const isRenaming = text !== null;

    const classes = useStyles();

    return (
        <>
            <ListItem className={classes.root} divider>
                <ListItemAvatar>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Avatar onClick={navigateToItem}>
                            <AvatarIcon />
                        </Avatar>
                    )}
                </ListItemAvatar>
                {isRenaming ? (
                    <TextField 
                        autoFocus 
                        fullWidth
                        label="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholder}
                        value={text}
                        variant="outlined"
                    />
                ) : (
                    <ListItemText 
                        onClick={navigateToItem} 
                        primary={primaryText} 
                        secondary={secondaryText} 
                    />
                )}
                {!isLoading && (
                    <FolderChildListItemActions 
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