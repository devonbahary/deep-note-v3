import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FormatUtil } from '../../utilities/FormatUtil';
import { ApiUtil } from '../../utilities/ApiUtil';

// TODO: can we use context here?
export const FolderChildListItemActions = (props) => {
    const { 
        closeMenu, 
        handleMenuDelete, 
        handleMenuRename, 
        handleReparent,
        item, 
        menuAnchorEl, 
        openMenu,
        parentFolder,
        siblingFolders,
    } = props;

    const menuItems = [
        {
            Icon: EditIcon,
            onClick: handleMenuRename,
            text: 'Rename',
        },
    ];

    if (parentFolder.parent_folder_uuid) {
        menuItems.push({
            Icon: FolderIcon,
            onClick: () => handleReparent(parentFolder.parent_folder_uuid),
            text: 'Move to parent',
        });
    }
    
    menuItems.push(...siblingFolders.reduce((acc, siblingFolder) => {
        if (siblingFolder.uuid === item.uuid) return acc;
        acc.push({
            Icon: FolderIcon,
            onClick: () => handleReparent(siblingFolder.uuid),
            text: `Move to ${FormatUtil.getFolderName(siblingFolder)}`,
        });
        return acc;
    }, []));

    menuItems.push({
        Icon: DeleteIcon,
        onClick: handleMenuDelete,
        text: 'Delete',
    });

    return (
        <ListItemSecondaryAction>
            <IconButton edge="end" onClick={openMenu}>
                <MoreVertIcon />
            </IconButton>
            <Menu onClose={closeMenu} open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl}>
                {menuItems.map((menuItem, idx) => {
                    const { Icon, onClick, subMenu, text } = menuItem;
                    return (
                        <MenuItem key={idx} onClick={onClick}>
                            <ListItemIcon>
                                <Icon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            {subMenu}
                        </MenuItem>
                    );
                })}
            </Menu>
        </ListItemSecondaryAction>
    );
};