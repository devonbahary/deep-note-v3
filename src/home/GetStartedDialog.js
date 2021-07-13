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
import { styled } from '@material-ui/core';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        fill: theme.palette.primary.main,
    },
}));

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
            <StyledDialogTitle id="form-dialog-title">Get Started</StyledDialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a new folder or enter the folder ID of an existing one.
                </DialogContentText>
                <StyledTextField
                    id="input-with-icon-textfield"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FolderIcon />
                            </InputAdornment>
                        ),
                    }}
                    label="Folder ID"
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
                    Create New Folder
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