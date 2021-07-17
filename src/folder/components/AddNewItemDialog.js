import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FolderIcon from '@material-ui/icons/Folder';
import { styled } from '@material-ui/core';

// TODO: consolidate with GetStartedDialog

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        fill: theme.palette.primary.main,
    },
}));

export const AddNewItemDialog = ({
    label,
    onClose,
    onSubmit,
    open,
}) => {
    const [ text, setText ] = useState('');

    const handleTextFieldKeyPress = (e) => {
        if (e.key === 'Enter') submit();
    };

    const submit = () => {
        onSubmit(text);
    };

    useEffect(() => {
        setText('');
    }, [open]);

    return (
        <Dialog open={Boolean(open)} onClose={onClose} aria-labelledby="form-dialog-title">
            <StyledDialogTitle id="form-dialog-title">{label}</StyledDialogTitle>
            <DialogContent>
                <StyledTextField
                    id="input-with-icon-textfield"
                    autoFocus
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FolderIcon />
                            </InputAdornment>
                        ),
                    }}
                    label="name"
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleTextFieldKeyPress}
                    placeholder="untitled"
                    value={text}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    color="primary" 
                    onClick={submit}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};