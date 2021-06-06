import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import { ApiUtil } from '../../utilities/ApiUtil';
import { FormatUtil } from '../../utilities/FormatUtil';
import { RouterUtil } from '../../utilities/RouterUtil';
import { deleteChildNote, updateChildNote } from '../actions';
import { FolderChildListItem } from './FolderChildListItem';

export const NoteListItem = ({ dispatch, note }) => {
    const { uuid, name, updated_at } = note;

    const history = useHistory();

    const navigateToNote = () => {
        if (isLoading) return;
        RouterUtil.goToNote(history, uuid);
    }

    const [ menuAnchorEl, setMenuAnchorEl ] = useState(null);
    const openMenu = (e) => setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const [ noteRenameText, setNoteRenameText ] = useState(null);

    const clearRenameText = () => setNoteRenameText(null);

    const isRenaming = noteRenameText !== null;

    const handleMenuRename = () => {
        closeMenu();
        setTimeout(() => setNoteRenameText(name || ''), 1);
    };

    const handleMenuDelete = async () => {
        setIsLoading(true);
        await ApiUtil.deleteNote(uuid);
        dispatch(deleteChildNote(uuid));
        setIsLoading(false);
    };

    const [ isLoading, setIsLoading ] = useState(false);

    const handleNoteRenameChange = (e) => setNoteRenameText(e.target.value);
    const handleNoteRenameBlur = async () => {
        clearRenameText();
        if (noteRenameText === name) return;
        setIsLoading(true);
        const note = await ApiUtil.updateNoteName(uuid, noteRenameText);
        dispatch(updateChildNote(note));
        setIsLoading(false);
    };
    const handleNoteRenameKeypress = (e) => {
        if (e.key === 'Enter') handleNoteRenameBlur();
    };

    const primaryText = FormatUtil.getName(note);
    const secondaryText = FormatUtil.getRelativeTimeFromMySQLTime(updated_at);

    return (
        <FolderChildListItem
            isLoading={isLoading}
            isRenaming={isRenaming}
            AvatarIcon={NoteIcon}
            avatarOnClick={navigateToNote}
            handleMenuDelete={handleMenuDelete}
            handleMenuRename={handleMenuRename}
            onBlur={handleNoteRenameBlur}
            onChange={handleNoteRenameChange}
            onKeyPress={handleNoteRenameKeypress}
            placeholder="note name"
            value={noteRenameText}
            onClick={navigateToNote}
            primaryText={primaryText}
            secondaryText={secondaryText}
            openMenu={openMenu}
            closeMenu={closeMenu}
            menuAnchorEl={menuAnchorEl}
            clearRenameText={clearRenameText}
        />
    );
};