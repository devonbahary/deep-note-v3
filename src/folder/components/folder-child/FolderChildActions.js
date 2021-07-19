import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PaletteIcon from '@material-ui/icons/Palette';

import { FolderChildMenuItem } from './FolderChildMenuItem';
import { RecolorDialog } from './RecolorDialog';

import { FormatUtil } from '../../../utilities/FormatUtil';

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
                <FolderChildMenuItem 
                    onClick={onRename}
                    text="Rename"
                    Icon={EditIcon}
                />

                <FolderChildMenuItem 
                    item={item}
                    onClick={() => setIsRecolorDialogOpen(true)}
                    text="Recolor"
                    Icon={PaletteIcon}
                />
                
                {parentFolder.parent_folder_uuid && (
                    <FolderChildMenuItem 
                        onClick={() => onReparent(parentFolder.parent_folder_uuid)}
                        text="Move to parent"
                        Icon={FolderIcon}
                    />
                )}

                {siblingFolders.map(siblingFolder => (
                    <FolderChildMenuItem 
                        key={siblingFolder.uuid}
                        item={siblingFolder}
                        onClick={() => onReparent(siblingFolder.uuid)}
                        text={`Move to ${FormatUtil.getFolderName(siblingFolder)}`}
                        Icon={FolderIcon}
                    />
                ))}

                <FolderChildMenuItem 
                    onClick={onDelete}
                    text="Delete"
                    Icon={DeleteIcon}
                />

            </Menu>
            <RecolorDialog 
                onClose={() => setIsRecolorDialogOpen(false)} 
                onSubmit={onColorChange}
                open={isRecolorDialogOpen} 
            />
        </ListItemSecondaryAction>
    );
};