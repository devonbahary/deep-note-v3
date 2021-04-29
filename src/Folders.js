import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import FolderIcon from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from './common/AppBar';
import { Content } from './common/Content';
import { RouterUtil } from './utilities/RouterUtil';
import { ApiUtil } from './utilities/ApiUtil';

const useStyles = makeStyles(() => ({
    folder: {
        cursor: 'pointer',
    },
}));

const FolderListItem = (props) => {
    const { 
        folderIcon: FolderIcon,
        onClick,
        primaryText,
        secondaryText,
    } = props;
    
    const classes = useStyles();

    return (
        <>
            <ListItem className={classes.folder} onClick={onClick}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primaryText} secondary={secondaryText} />
            </ListItem>
            <Divider />
        </>
    );
};

export const Folders = () => {
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

    if (!folder) return null;

    const goBackFn = folder.parent_folder_uuid ? () => RouterUtil.goToFolder(history, folder.parent_folder_uuid) : null;

    const title = folder.name || 'untitled';

    return (
        <>
            <AppBar goBackFn={goBackFn} title={title} />
            <Content>
                <List>
                    {childFolders.map(childFolder => {
                        const { uuid, name, updated_at } = childFolder;
                        const formattedUpdatedAt = new Date(updated_at).toLocaleString();
                        const navigateToFolder = () => RouterUtil.goToFolder(history, uuid);

                        return (
                            <FolderListItem 
                                key={uuid}
                                folderIcon={FolderIcon}
                                onClick={navigateToFolder}
                                primaryText={name || 'untitled'}
                                secondaryText={formattedUpdatedAt}
                            />
                        );
                    })}
                    {!isAddingNewFolder && (
                        <FolderListItem
                            folderIcon={CreateNewFolderIcon}
                            onClick={addNewFolder}
                            primaryText='Add folder'
                        />
                    )}
                </List>    
            </Content>
        </>
    );
};