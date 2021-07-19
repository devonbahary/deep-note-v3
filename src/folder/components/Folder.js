import React, { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import List from '@material-ui/core/List';

import { AddNewItemFab } from './add-new-item/AddNewItemFab';
import { AppBar } from '../../common/AppBar';
import { Content } from '../../common/Content';
import { FolderChildListItem } from './folder-child/FolderChildListItem';

import { ApiUtil } from '../../utilities/ApiUtil';
import { FormatUtil } from '../../utilities/FormatUtil';
import { RouterUtil } from '../../utilities/RouterUtil';

import { setFolder } from '../actions';
import { reducer, initialState } from '../reducer';

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
                    {childFolders.map(childFolder => (
                        <FolderChildListItem 
                            key={childFolder.uuid}
                            dispatch={dispatch}
                            item={childFolder}
                            parentFolder={folder}
                            placeholder="folder name"
                            siblingFolders={childFolders}
                            type="folder"
                        />      
                    ))}
                    {childNotes.map(note => (
                        <FolderChildListItem
                            key={note.uuid}
                            dispatch={dispatch}
                            item={note}
                            parentFolder={folder}
                            placeholder="note name"
                            siblingFolders={childFolders}
                            type="note"
                        />
                    ))}
                    {!isLoading && (
                        <AddNewItemFab 
                            currentFolderUUID={uuid} 
                            dispatch={dispatch} 
                        />
                    )}
                </List>
            </Content>
        </>
    );
};