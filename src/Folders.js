import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
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

    const classes = useStyles();

    if (!folder) return null;

    const goBackFn = folder.parent_folder_uuid ? () => RouterUtil.goToFolder(history, folder.parent_folder_uuid) : null;

    return (
        <div>
            <AppBar goBackFn={goBackFn} title={folder.name} />
            <Content>
                <List>
                    {childFolders.map(childFolder => {
                        const { uuid, name, updated_at } = childFolder;
                        const formattedUpdatedAt = new Date(updated_at).toLocaleString();
                        const handleClick = () => RouterUtil.goToFolder(history, uuid);

                        return (
                            <div key={uuid}>
                                <ListItem className={classes.folder} onClick={handleClick}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={name} secondary={formattedUpdatedAt} />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
                </List>    
            </Content>
        </div>
    );
};