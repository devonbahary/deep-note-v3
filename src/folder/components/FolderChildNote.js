import React from 'react';
import NoteIcon from '@material-ui/icons/Note';
import { ApiUtil } from '../../utilities/ApiUtil';
import { FormatUtil } from '../../utilities/FormatUtil';
import { RouterUtil } from '../../utilities/RouterUtil';
import { deleteChildNote, updateChildNote } from '../actions';
import { FolderChildListItem } from './FolderChildListItem';

export const FolderChildNote = ({ dispatch, note, parentFolder, siblingFolders }) => {
    const primaryText = FormatUtil.getName(note);
    const secondaryText = FormatUtil.getRelativeTimeFromMySQLTime(note.updated_at);

    return (
        <FolderChildListItem
            AvatarIcon={NoteIcon}
            deleteChildApi={ApiUtil.deleteNote}
            deleteChildState={deleteChildNote}
            dispatch={dispatch}
            item={note}
            navigateFn={RouterUtil.goToNote}
            parentFolder={parentFolder}
            placeholder="note name"
            primaryText={primaryText}
            reparentChildApi={ApiUtil.reparentNote}
            secondaryText={secondaryText}
            siblingFolders={siblingFolders}
            type="note"
            updateChildApi={ApiUtil.updateNoteName}
            updateColorApi={ApiUtil.updateNoteColor}
            updateChildState={updateChildNote}
        />
    );
};