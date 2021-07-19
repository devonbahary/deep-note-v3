import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core';

import { colors } from '../../../constants';

const StyledListItem = styled(ListItem)(({ color }) => ({
    background: color,
    cursor: 'pointer',
    height: '5rem',
}));

export const RecolorDialog = ({ onClose, onSubmit, open }) => {
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
                    {Object.entries(colors).map(
                        ([ colorName, colorCSS ]) => (
                            <StyledListItem 
                                key={colorName} 
                                color={colorCSS}
                                onClick={() => onSubmit(colorName)}
                            />
                        )
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
}