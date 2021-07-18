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
import { ColorUtil } from '../../utilities/ColorUtil';

const StyledAvatar = styled(Avatar)(({ color, theme, type }) => {
    const itemColor = ColorUtil.getItemColor(color, theme);

    return {
        '&.MuiAvatar-colorDefault': {
            backgroundColor: type === 'folder' ? itemColor : 'transparent',
            color: type === 'folder' ? 'inherit' : itemColor,
        },
    };
});

const StyledBackdrop = styled(Backdrop)({
    zIndex: 1,
});

const StyledListItem = styled(ListItem)({
    cursor: 'pointer',
});

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    '& .MuiListItemText-primary': {
        color: theme.palette.text.primaryDark,
    },
    '& .MuiListItemText-secondary': {
        color: theme.palette.text.secondaryDark,
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        color: theme.palette.text.primaryDark,
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
        parentFolder,
        placeholder,
        primaryText,
        reparentChildApi,
        secondaryText,
        siblingFolders,
        type,
        updateChildApi,
        updateColorApi,
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

    const handleMenuRecolor = async (color) => {
        closeMenu();
        setIsLoading(true);
        const folderChild = await updateColorApi(item.uuid, color);
        dispatch(updateChildState(folderChild))
        setIsLoading(false);
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
                        <StyledAvatar onClick={navigateToItem} type={type} color={item.color}>
                            <AvatarIcon />
                        </StyledAvatar>
                    )}
                </ListItemAvatar>
                {isRenaming ? (
                    <StyledTextField 
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
                    <StyledListItemText 
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
                        handleMenuRecolor={handleMenuRecolor}
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