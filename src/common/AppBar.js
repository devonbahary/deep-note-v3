import React from 'react';
import MaterialUIAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { styled } from '@material-ui/core/styles';

const StyledMaterialUIAppBar = styled(MaterialUIAppBar)(({ theme }) => ({
    background: theme.palette.background.dark,
}));

const StyledToolbar = styled(Toolbar)({
    padding: 0,
});

export const AppBar = ({ children, goBackFn, title }) => {
    const iconButtonStyles = goBackFn ? null : { visibility: 'hidden' };

    return (
        <StyledMaterialUIAppBar position="sticky">
            <StyledToolbar variant="dense">
                <IconButton color="inherit" onClick={goBackFn} style={iconButtonStyles}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" style={{flex: 1 }}>
                    {title}
                </Typography>
                {children}
            </StyledToolbar>
        </StyledMaterialUIAppBar>
    );
};