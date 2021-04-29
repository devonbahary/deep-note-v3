import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Folders } from './Folders';
import { Home } from './home/Home';

const useStyles = makeStyles(() => ({
    content: {
        height: '100vh',
        overflow: 'auto',
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/folders/:uuid">
                        <Folders />
                    </Route>
                    <Route exact path="">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);