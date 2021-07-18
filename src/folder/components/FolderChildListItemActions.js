import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import PaletteIcon from '@material-ui/icons/Palette';
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FormatUtil } from '../../utilities/FormatUtil';
import { styled } from '@material-ui/core';
import { ColorUtil } from '../../utilities/ColorUtil';
import { RecolorDialog } from './RecolorDialog';

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
export const FolderChildListItemActions = (props) => {
    const { 
        closeMenu, 
        handleMenuDelete, 
        handleMenuRecolor,
        handleMenuRename, 
        handleReparent,
        item, 
        menuAnchorEl, 
        openMenu,
        parentFolder,
        siblingFolders,
    } = props;

    const [ isRecolorDialogOpen, setIsRecolorDialogOpen ] = useState(false);

    const onColorChange = (color) => {
        setIsRecolorDialogOpen(false);
        handleMenuRecolor(color);
    };

    const menuItems = [];

    if (parentFolder.parent_folder_uuid) {
        menuItems.push({
            Icon: FolderIcon,
            item: parentFolder,
            onClick: () => handleReparent(parentFolder.parent_folder_uuid),
            text: 'Move to parent',
        });
    }
    
    menuItems.push(...siblingFolders.reduce((acc, siblingFolder) => {
        if (siblingFolder.uuid === item.uuid) return acc;
        acc.push({
            Icon: FolderIcon,
            item: siblingFolder,
            onClick: () => handleReparent(siblingFolder.uuid),
            text: `Move to ${FormatUtil.getFolderName(siblingFolder)}`,
        });
        return acc;
    }, []));

    return (
        <ListItemSecondaryAction>
            <IconButton edge="end" onClick={openMenu}>
                <MoreVertIcon />
            </IconButton>
            <Menu onClose={closeMenu} open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl}>
                
                <MenuItem onClick={handleMenuRename}>
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

                {menuItems.map((menuItem, idx) => {
                    const { Icon, item, onClick, text } = menuItem;
                    return (
                        <MenuItem key={idx} onClick={onClick}>
                            <StyledByItemListItemIcon item={item}>
                                <Icon />
                            </StyledByItemListItemIcon>
                            <ListItemText primary={text} />
                        </MenuItem>
                    );
                })}

                <MenuItem onClick={handleMenuDelete}>
                    <StyledListItemIcon>
                        <DeleteIcon />
                    </StyledListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>

            </Menu>
            <RecolorDialog 
                open={isRecolorDialogOpen} 
                onClose={() => setIsRecolorDialogOpen(false)} 
                onSubmit={onColorChange}
            />
        </ListItemSecondaryAction>
    );
};