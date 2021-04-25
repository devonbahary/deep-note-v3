import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    content: {
        height: '100vh',
        overflow: 'auto',
    },
}));

export const Content = (props) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            {props.children}
        </main>
    );
};