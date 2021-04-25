import React from 'react';
import MaterialUIAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    invisible: {
        visibility: 'hidden',
    },
}));

export const AppBar = ({ goBackFn, title }) => {
    const classes = useStyles();

    const iconButtonClassName = goBackFn ? null : classes.invisible;

    return (
        <MaterialUIAppBar position="static">
            <Toolbar variant="dense">
                <IconButton className={iconButtonClassName} color="inherit" edge="start" onClick={goBackFn}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6">
                    {title}
                </Typography>
            </Toolbar>
        </MaterialUIAppBar>
    );
};