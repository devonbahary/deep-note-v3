import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FolderIcon from '@material-ui/icons/Folder';

export const GetStartedDialog = ({ 
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