import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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

export const Home = () => {
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const [ folderUUID, setFolderUUID ] = useState('');
    const handleFolderUUIDChange = (e) => setFolderUUID(e.target.value);

    const history = useHistory();
    const handleNavigate = () => RouterUtil.goToFolder(history, folderUUID);
    const handleTextFieldKeyPress = (e) => {
        if (e.key === 'Enter') handleNavigate();
    };
    
    const classes = useStyles();

    const isNavigateButtonDisabled = !Boolean(folderUUID.length);

    return (
        <div>
            <AppBar title="deep-note" />
            <Content>
                <div className={classes.home}>
                    <Button color="primary" onClick={openDialog} variant="outlined">
                        Get Started
                    </Button>
                    <Dialog open={isDialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Get Started</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Enter the UUID of a folder you want to navigate to.
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
                            disabled={isNavigateButtonDisabled} 
                            onClick={handleNavigate} 
                            variant="contained"
                        >
                            Navigate
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>   
            </Content>
        </div>
    );
};