import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styled } from '@material-ui/core/styles';
import { AppBar } from '../common/AppBar';
import { Content } from '../common/Content';
import { GetStartedDialog } from './GetStartedDialog';
import { RouterUtil } from '../utilities/RouterUtil';
import { ApiUtil } from '../utilities/ApiUtil';

const StyledDiv = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

export const Home = () => {
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const [ folderUUID, setFolderUUID ] = useState('');
    const handleFolderUUIDChange = (e) => setFolderUUID(e.target.value);

    const history = useHistory();
    const handleNavigate = () => RouterUtil.goToFolder(history, folderUUID);

    const [ isLoadingNewFolder, setIsLoadingNewFolder ] = useState(false);
    const handleCreateNewFolder = async () => {
        setIsLoadingNewFolder(true);
        const folder = await ApiUtil.createFolder(undefined, '');
        RouterUtil.goToFolder(history, folder.uuid);
    }
    
    return (
        <div>
            <AppBar title="deep-note" />
            <Content>
                {isLoadingNewFolder ? (
                    <Backdrop open>
                        <CircularProgress />
                    </Backdrop>
                ) : (
                    <StyledDiv>
                        <Button color="primary" onClick={openDialog} variant="contained">
                            Get Started
                        </Button>
                        <GetStartedDialog 
                            folderUUID={folderUUID}
                            handleCreateNewFolder={handleCreateNewFolder}
                            handleFolderUUIDChange={handleFolderUUIDChange}
                            handleNavigate={handleNavigate}
                            onClose={closeDialog}
                            open={isDialogOpen} 
                        />
                    </StyledDiv>   
                )}
            </Content>
        </div>
    );
};