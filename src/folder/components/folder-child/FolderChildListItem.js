import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import NoteIcon from '@material-ui/icons/Note';

import { FolderChildActions } from './FolderChildActions';

import { deleteChildFolder, deleteChildNote, updateChildFolder, updateChildNote } from '../../actions';

import { ApiUtil } from '../../../utilities/ApiUtil';
import { ColorUtil } from '../../../utilities/ColorUtil';
import { FormatUtil } from '../../../utilities/FormatUtil';
import { RouterUtil } from '../../../utilities/RouterUtil';

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

const getDeleteFunctions = (type) => {
    return type === 'folder'
        ? [ ApiUtil.deleteFolder, deleteChildFolder ]
        : [ ApiUtil.deleteNote, deleteChildNote ];
};

const getListItemTextFunctions = (type) => {
    return type === 'folder'
        ? [ FormatUtil.getFolderName, FormatUtil.getFolderSecondaryText ]
        : [ FormatUtil.getName, FormatUtil.getNoteSecondaryText ];
};

const getNavigateFunction = (type) => {
    return type === 'folder'
        ? RouterUtil.goToFolder
        : RouterUtil.goToNote;
};

const getRecolorFunctions = (type) => {
    return type === 'folder'
        ? [ ApiUtil.updateFolderColor, updateChildFolder ]
        : [ ApiUtil.updateNoteColor, updateChildNote ];
};

const getReparentFunctions = (type) => {
    return type === 'folder'
        ? [ ApiUtil.reparentFolder, deleteChildFolder ]
        : [ ApiUtil.reparentNote, deleteChildNote ];
};

const getUpdateNameFunctions = (type) => {
    return type === 'folder'
        ? [ ApiUtil.updateFolderName, updateChildFolder ]
        : [ ApiUtil.updateNoteName, updateChildNote ];
};

export const FolderChildListItem = (props) => {
    const {
        dispatch,
        item,
        parentFolder,
        placeholder,
        siblingFolders,
        type,
    } = props;

    const history = useHistory();

    const [ menuAnchorEl, setMenuAnchorEl ] = useState(null);
    const openMenu = (e) => setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const [ text, setText ] = useState(null);

    const [ isLoading, setIsLoading ] = useState(false);

    const updateName = async () => {
        setText(null);
        
        if (text === item.name) {
            return;
        }
        
        setIsLoading(true);
        
        const [ updateNameApi, updateChildState ] = getUpdateNameFunctions(type);
        const updatedChild = await updateNameApi(item.uuid, text);
        dispatch(updateChildState(updatedChild));

        setIsLoading(false);
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            updateName();
        }
    };

    const navigate = () => {
        if (!isLoading) {
            getNavigateFunction(type)(history, item.uuid);
        }
    }

    const onRename = () => {
        closeMenu();
        // TODO: this is bad
        setTimeout(() => setText(item.name || ''), 1);
    };

    const onRecolor = async (color) => {
        closeMenu();
        setIsLoading(true);

        const [ updateColorApi, updateChildState ] = getRecolorFunctions(type);
        const updatedChild = await updateColorApi(item.uuid, color);
        dispatch(updateChildState(updatedChild));

        setIsLoading(false);
    };

    const onDelete = async () => {
        setIsLoading(true);

        const [ deleteApi, deleteChildState ] = getDeleteFunctions(type);
        await deleteApi(item.uuid);
        dispatch(deleteChildState(item.uuid));
        
        setIsLoading(false);
    };
    
    const onReparent = async (parentUUID) => {
        setIsLoading(true);

        const [ reparentApi, deleteChildState ] = getReparentFunctions(type);
        await reparentApi(item.uuid, parentUUID);
        dispatch(deleteChildState(item.uuid));
        
        setIsLoading(false);
    };

    const isRenaming = text !== null;

    const [ getPrimaryText, getSecondaryText ] = getListItemTextFunctions(type);

    return (
        <>
            <StyledListItem divider>
                <ListItemAvatar>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <StyledAvatar onClick={navigate} type={type} color={item.color}>
                            {type === 'folder'
                                ? <FolderIcon />
                                : <NoteIcon />
                            }
                        </StyledAvatar>
                    )}
                </ListItemAvatar>
                {isRenaming ? (
                    <StyledTextField 
                        autoFocus 
                        fullWidth
                        label="name"
                        onBlur={updateName}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={onKeyPress}
                        placeholder={placeholder}
                        value={text}
                        variant="outlined"
                    />
                ) : (
                    <StyledListItemText 
                        onClick={navigate} 
                        primary={getPrimaryText(item)} 
                        secondary={getSecondaryText(item)} 
                    />
                )}
                {!isLoading && (
                    <FolderChildActions 
                        closeMenu={closeMenu}
                        item={item}
                        menuAnchorEl={menuAnchorEl}
                        onDelete={onDelete}
                        onRecolor={onRecolor}
                        onRename={onRename}
                        onReparent={onReparent}
                        openMenu={openMenu}
                        parentFolder={parentFolder}
                        siblingFolders={siblingFolders}
                    />
                )}
            </StyledListItem>
            <StyledBackdrop
                invisible
                onClick={() => setText(null)}
                open={isRenaming}
            />
        </>
    );
};