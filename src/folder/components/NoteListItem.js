import React from 'react';
import NoteIcon from '@material-ui/icons/Note';
import { ApiUtil } from '../../utilities/ApiUtil';
import { FormatUtil } from '../../utilities/FormatUtil';
import { RouterUtil } from '../../utilities/RouterUtil';
import { deleteChildNote, updateChildNote } from '../actions';
import { FolderChildListItem } from './FolderChildListItem';

export const NoteListItem = ({ dispatch, note }) => {
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
            placeholder="note name"
            primaryText={primaryText}
            secondaryText={secondaryText}
            updateChildApi={ApiUtil.updateNoteName}
            updateChildState={updateChildNote}
        />
    );
};