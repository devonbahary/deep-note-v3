import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import { AppBar } from '../common/AppBar';
import { Content } from '../common/Content';
import { AddFolderListItem } from './AddFolderListItem';
import { FolderListItem } from './FolderListItem';
import { RouterUtil } from '../utilities/RouterUtil';
import { ApiUtil } from '../utilities/ApiUtil';

export const Folder = () => {
    const { uuid } = useParams();
    const history = useHistory();

    const [ folder, setFolder ] = useState(null);
    const [ childFolders, setChildFolders ] = useState([]);

    useEffect(() => {
        const getFolder = async () => {
            const { folder, childFolders } = await ApiUtil.getFolder(uuid);
            setFolder(folder);
            setChildFolders(childFolders);
        }

        getFolder();
    }, [ uuid ]);

    const [ isAddingNewFolder, setIsAddingNewFolder ] = useState(false);
    const addNewFolder = async () => {
        setIsAddingNewFolder(true);
        const newFolder = await ApiUtil.createFolder(null, uuid);
        setChildFolders([ ...childFolders, newFolder ]);
        setIsAddingNewFolder(false);
    }

    const updateChildFolder = (uuid, folder) => {
        setChildFolders(childFolders.map(f => f.uuid === uuid ? folder : f));
    };

    const deleteChildFolder = (uuid) => {
        setChildFolders(childFolders.filter(c => c.uuid !== uuid));
    };

    if (!folder) return null;

    const goBackFn = folder.parent_folder_uuid ? () => RouterUtil.goToFolder(history, folder.parent_folder_uuid) : null;

    const title = folder.name || 'untitled';

    return (
        <>
            <AppBar goBackFn={goBackFn} title={title} />
            <Content>
                <List>
                    {childFolders.map(childFolder => 
                        <FolderListItem
                            key={childFolder.uuid} 
                            folder={childFolder} 
                            updateChildFolder={updateChildFolder} 
                            deleteChildFolder={deleteChildFolder}
                        /> 
                    )}
                    {!isAddingNewFolder && <AddFolderListItem onClick={addNewFolder} />}
                </List>    
            </Content>
        </>
    );
};