import React, { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import FolderIcon from '@material-ui/icons/Folder';
import NoteIcon from '@material-ui/icons/Note';
import { AppBar } from '../../common/AppBar';
import { Content } from '../../common/Content';
import { FolderChildListItem } from './FolderChildListItem';
import { AddNewItemFab } from './add-new-item/AddNewItemFab';
import { ApiUtil } from '../../utilities/ApiUtil';
import { FormatUtil } from '../../utilities/FormatUtil';
import { RouterUtil } from '../../utilities/RouterUtil';
import { reducer, initialState } from '../reducer';
import { 
    deleteChildFolder,
    deleteChildNote,
    setFolder,
    updateChildFolder, 
    updateChildNote, 
} from '../actions';

export const Folder = () => {
    const { uuid } = useParams();
    const history = useHistory();

    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    const { folder, childFolders, childNotes, isLoading } = state;

    useEffect(() => {
        const getFolder = async () => {
            const folder = await ApiUtil.getFolder(uuid);
            dispatch(setFolder(folder));
        }

        getFolder();
    }, [ uuid ]);

    if (!folder) {
        return null;
    }

    const goBackFn = folder.parent_folder_uuid 
        ? () => RouterUtil.goToFolder(history, folder.parent_folder_uuid) 
        : null;

    const title = FormatUtil.getFolderName(folder);

    // TODO: don't delete a folder without verifying its contents / size of contents
    return (
        <>
            <AppBar goBackFn={goBackFn} title={title} />
            <Content>
                <List>
                    {childFolders.map(childFolder => {
                        const primaryText = FormatUtil.getFolderName(childFolder);
                        const secondaryText = FormatUtil.getFolderSecondaryText(childFolder);

                        return (
                            <FolderChildListItem 
                                key={childFolder.uuid}
                                AvatarIcon={FolderIcon}
                                deleteChildApi={ApiUtil.deleteFolder}
                                deleteChildState={deleteChildFolder}
                                dispatch={dispatch}
                                item={childFolder}
                                navigateFn={RouterUtil.goToFolder}
                                parentFolder={folder}
                                placeholder="folder name"
                                primaryText={primaryText}
                                reparentChildApi={ApiUtil.reparentFolder}
                                secondaryText={secondaryText}
                                siblingFolders={childFolders}
                                type="folder"
                                updateChildApi={ApiUtil.updateFolderName}
                                updateColorApi={ApiUtil.updateFolderColor}
                                updateChildState={updateChildFolder}
                            />      
                        );
                    })}
                    {childNotes.map(note => {
                        const primaryText = FormatUtil.getName(note);
                        const secondaryText = FormatUtil.getRelativeTimeFromMySQLTime(note.updated_at);

                        return (
                            <FolderChildListItem
                                key={note.uuid}
                                AvatarIcon={NoteIcon}
                                deleteChildApi={ApiUtil.deleteNote}
                                deleteChildState={deleteChildNote}
                                dispatch={dispatch}
                                item={note}
                                navigateFn={RouterUtil.goToNote}
                                parentFolder={folder}
                                placeholder="note name"
                                primaryText={primaryText}
                                reparentChildApi={ApiUtil.reparentNote}
                                secondaryText={secondaryText}
                                siblingFolders={childFolders}
                                type="note"
                                updateChildApi={ApiUtil.updateNoteName}
                                updateColorApi={ApiUtil.updateNoteColor}
                                updateChildState={updateChildNote}
                            />
                        );
                    })}
                    {!isLoading && <AddNewItemFab currentFolderUUID={uuid} dispatch={dispatch} />}
                </List>
            </Content>
        </>
    );
};