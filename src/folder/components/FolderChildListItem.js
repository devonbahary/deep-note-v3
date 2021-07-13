import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import { FolderChildListItemActions } from './FolderChildListItemActions';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    '&.MuiAvatar-colorDefault': {
        backgroundColor: theme.palette.primary.main,
    },
}));

const StyledBackdrop = styled(Backdrop)({
    zIndex: 1,
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
    '& .MuiListItemText-primary': {
        color: theme.palette.text.primaryDark,
    },
    '& .MuiListItemText-secondary': {
        color: theme.palette.text.secondaryDark,
    },
    cursor: 'pointer',
}));

export const FolderChildListItem = (props) => {
    const {
        AvatarIcon,
        deleteChildApi,
        deleteChildState,
        dispatch,
        item,
        navigateFn,
        parentFolder,
        placeholder,
        primaryText,
        reparentChildApi,
        secondaryText,
        siblingFolders,
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
    
    const handleReparent = async (parentUUID) => {
        setIsLoading(true);
        await reparentChildApi(item.uuid, parentUUID);
        dispatch(deleteChildState(item.uuid));
        setIsLoading(false);
    };

    const handleBackdropClick = () => setText(null);

    const isRenaming = text !== null;

    return (
        <>
            <StyledListItem divider>
                <ListItemAvatar>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <StyledAvatar onClick={navigateToItem}>
                            <AvatarIcon />
                        </StyledAvatar>
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
                        handleReparent={handleReparent}
                        item={item}
                        menuAnchorEl={menuAnchorEl}
                        openMenu={openMenu}
                        parentFolder={parentFolder}
                        siblingFolders={siblingFolders}
                    />
                )}
            </StyledListItem>
            <StyledBackdrop
                invisible
                onClick={handleBackdropClick}
                open={isRenaming}
            />
        </>
    );
};