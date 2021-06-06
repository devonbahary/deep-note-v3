import React from 'react';
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
    const primaryText = FormatUtil.getFolderName(folder);
    const secondaryText = getSecondaryText(folder);

    return (
        <FolderChildListItem 
            AvatarIcon={FolderIcon}
            deleteChildApi={ApiUtil.deleteFolder}
            deleteChildState={deleteChildFolder}
            dispatch={dispatch}
            item={folder}
            navigateFn={RouterUtil.goToFolder}
            placeholder="folder name"
            primaryText={primaryText}
            secondaryText={secondaryText}
            updateChildApi={ApiUtil.updateFolderName}
            updateChildState={updateChildFolder}
        />
    );
};