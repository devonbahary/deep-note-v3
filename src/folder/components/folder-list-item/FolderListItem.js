import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';
import { ApiUtil } from '../../../utilities/ApiUtil';
import { FormatUtil } from '../../../utilities/FormatUtil';
import { RouterUtil } from '../../../utilities/RouterUtil';
import { deleteChildFolder, updateChildFolder } from '../../actions';
import { FolderChildListItem } from '../FolderChildListItem';

const getSecondaryText = (folder) => {
    const { updated_at, child_folder_count, child_note_count } = folder;
    
    let secondaryText = ``;
    
    if (child_folder_count) {
        secondaryText += `${child_folder_count} folder`
        if (child_folder_count > 1) secondaryText += `s`;
        secondaryText += ` | `;
    }
    
    if (child_note_count) {
        secondaryText += `${child_note_count} note`
        if (child_note_count > 1) secondaryText += `s`;
        secondaryText += ` | `;
    }

    secondaryText += FormatUtil.getRelativeTimeFromMySQLTime(updated_at);
    
    return secondaryText;
};

// TODO: confirm want delete, include # of children in confirm
export const FolderListItem = ({ dispatch, folder }) => {
    const { uuid, name } = folder;

    const history = useHistory();

    const navigateToFolder = () => {
        if (isLoading) return;
        RouterUtil.goToFolder(history, uuid);
    }

    const [ menuAnchorEl, setMenuAnchorEl ] = useState(null);
    const openMenu = (e) => setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const [ folderRenameText, setFolderRenameText ] = useState(null);

    const clearRenameText = () => setFolderRenameText(null);

    const isRenaming = folderRenameText !== null;

    const handleMenuRename = () => {
        closeMenu();
        setTimeout(() => setFolderRenameText(name || ''), 1);
    };

    const handleMenuDelete = async () => {
        setIsLoading(true);
        await ApiUtil.deleteFolder(uuid);
        dispatch(deleteChildFolder(uuid));
        setIsLoading(false);
    };

    const [ isLoading, setIsLoading ] = useState(false);

    const handleFolderRenameChange = (e) => setFolderRenameText(e.target.value);
    const handleFolderRenameBlur = async () => {
        clearRenameText();
        if (folderRenameText === name) return;
        setIsLoading(true);
        const folder = await ApiUtil.updateFolderName(uuid, folderRenameText);
        dispatch(updateChildFolder(folder))
        setIsLoading(false);
    };
    const handleFolderRenameKeypress = (e) => {
        if (e.key === 'Enter') handleFolderRenameBlur();
    };

    const primaryText = FormatUtil.getFolderName(folder);
    const secondaryText = getSecondaryText(folder);

    return (
        <FolderChildListItem 
            isLoading={isLoading}
            isRenaming={isRenaming}
            AvatarIcon={FolderIcon}
            avatarOnClick={navigateToFolder}
            handleMenuDelete={handleMenuDelete}
            handleMenuRename={handleMenuRename}
            onBlur={handleFolderRenameBlur}
            onChange={handleFolderRenameChange}
            onKeyPress={handleFolderRenameKeypress}
            placeholder="folder name"
            value={folderRenameText}
            onClick={navigateToFolder}
            primaryText={primaryText}
            secondaryText={secondaryText}
            openMenu={openMenu}
            closeMenu={closeMenu}
            menuAnchorEl={menuAnchorEl}
            clearRenameText={clearRenameText}
        />
    );
};