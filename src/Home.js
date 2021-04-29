import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FolderIcon from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from './common/AppBar';
import { Content } from './common/Content';
import { RouterUtil } from './utilities/RouterUtil';
import { ApiUtil } from './utilities/ApiUtil';

const useStyles = makeStyles(() => ({
    content: {
        height: '100vh',
        overflow: 'auto',
    },
    home: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

const GetStartedDialog = ({ 
    folderUUID,
    handleCreateNewFolder,
    handleFolderUUIDChange,
    handleNavigate,
    onClose,
    open, 
}) => {
    const handleTextFieldKeyPress = (e) => {
        if (e.key === 'Enter') handleNavigate();
    };

    const isCreateNewFolderButtonDisabled = Boolean(folderUUID.length);
    const isNavigateButtonDisabled = !Boolean(folderUUID.length);

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Get Started</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the UUID of a folder you want to navigate to or create a new one.
                </DialogContentText>
                <TextField
                    id="input-with-icon-textfield"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FolderIcon />
                            </InputAdornment>
                        ),
                    }}
                    label="Folder UUID"
                    onChange={handleFolderUUIDChange}
                    onKeyPress={handleTextFieldKeyPress}
                    value={folderUUID}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    color="primary" 
                    disabled={isCreateNewFolderButtonDisabled} 
                    onClick={handleCreateNewFolder}
                >
                    Create A New Folder
                </Button>
                <Button 
                    color="primary" 
                    disabled={isNavigateButtonDisabled} 
                    onClick={handleNavigate} 
                    variant="contained"
                >
                    Navigate
                </Button>
            </DialogActions>
        </Dialog>
    );
};

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
        const folder = await ApiUtil.createFolder();
        RouterUtil.goToFolder(history, folder.uuid);
    }
    
    const classes = useStyles();

    return (
        <div>
            <AppBar title="deep-note" />
            <Content>
                {isLoadingNewFolder ? (
                    <Backdrop open>
                        <CircularProgress />
                    </Backdrop>
                ) : (
                    <div className={classes.home}>
                        <Button color="primary" onClick={openDialog} variant="outlined">
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
                    </div>   
                )}
            </Content>
        </div>
    );
};