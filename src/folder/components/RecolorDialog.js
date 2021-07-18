import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, DialogContentText, DialogTitle, List, ListItem, styled } from '@material-ui/core';
import { colors } from '../../constants';

const StyledListItem = styled(ListItem)(({ color }) => ({
    background: color,
    cursor: 'pointer',
    height: '5rem',
}));

export const RecolorDialog = ({ onClose, open, onSubmit }) => {
    return (
        <Dialog 
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={Boolean(open)} 
        >
            <DialogTitle>
                Recolor
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select a new color for the item.
                </DialogContentText>
                <List>
                    {Object.entries(colors).map(([ colorName, colorCSS ]) => (
                        <StyledListItem 
                            key={colorName} 
                            color={colorCSS}
                            onClick={() => onSubmit(colorName)}
                        />
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}