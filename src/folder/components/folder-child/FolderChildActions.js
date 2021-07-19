import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PaletteIcon from '@material-ui/icons/Palette';

import { RecolorDialog } from './RecolorDialog';

import { ColorUtil } from '../../../utilities/ColorUtil';
import { FormatUtil } from '../../../utilities/FormatUtil';

const StyledByItemListItemIcon = styled(ListItemIcon)(({ theme, item }) => ({
    '& .MuiSvgIcon-root': {
        fill: ColorUtil.getItemColor(item ? item.color : null, theme),
    },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        fill: theme.palette.text.primary,
    },
}));

// TODO: can we use context here?
export const FolderChildActions = (props) => {
    const { 
        closeMenu, 
        item, 
        menuAnchorEl, 
        onDelete, 
        onRecolor,
        onRename, 
        onReparent,
        openMenu,
        parentFolder,
        siblingFolders,
    } = props;

    const [ isRecolorDialogOpen, setIsRecolorDialogOpen ] = useState(false);

    const onColorChange = (color) => {
        setIsRecolorDialogOpen(false);
        onRecolor(color);
    };

    return (
        <ListItemSecondaryAction>
            <IconButton edge="end" onClick={openMenu}>
                <MoreVertIcon />
            </IconButton>
            <Menu onClose={closeMenu} open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl}>
                
                <MenuItem onClick={onRename}>
                    <StyledListItemIcon>
                        <EditIcon />
                    </StyledListItemIcon>
                    <ListItemText primary="Rename" />
                </MenuItem>

                <MenuItem onClick={() => setIsRecolorDialogOpen(true)}>
                    <StyledByItemListItemIcon item={item}>
                        <PaletteIcon />
                    </StyledByItemListItemIcon>
                    <ListItemText primary="Recolor" />
                </MenuItem>

                {parentFolder.parent_folder_uuid && (
                    <MenuItem onClick={() => onReparent(parentFolder.parent_folder_uuid)}>
                        <StyledByItemListItemIcon item={parentFolder}>
                            <FolderIcon />
                        </StyledByItemListItemIcon>
                        <ListItemText primary="Move to parent" />
                    </MenuItem>
                )}

                {siblingFolders.map(siblingFolder => (
                    <MenuItem key={siblingFolder.uuid} onClick={() => onReparent(siblingFolder.uuid)}>
                        <StyledByItemListItemIcon item={siblingFolder}>
                            <FolderIcon />
                        </StyledByItemListItemIcon>
                        <ListItemText primary={`Move to ${FormatUtil.getFolderName(siblingFolder)}`} />
                    </MenuItem>
                ))}

                <MenuItem onClick={onDelete}>
                    <StyledListItemIcon>
                        <DeleteIcon />
                    </StyledListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>

            </Menu>
            <RecolorDialog 
                onClose={() => setIsRecolorDialogOpen(false)} 
                onSubmit={onColorChange}
                open={isRecolorDialogOpen} 
            />
        </ListItemSecondaryAction>
    );
};