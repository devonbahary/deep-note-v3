import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Folder } from './folder/components/Folder';
import { Home } from './home/Home';
import { Note } from './note/Note';

const theme = createMuiTheme({
    palette: {
        primary: {
            contrastText: '#FFFFFF',
            main: '#7DB19F',
        },
        secondary: {
            main: '#D8D7E3',
        },
        error: {
            main: '#BC7588',
        },
        background: {
            dark: '#13121B',
            default: '#FFFFFF',
            paper: '#4B4A54',
        },
        text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            primaryDark: 'rgba(0, 0, 0, 0.87)',
            secondaryDark: 'rgba(0, 0, 0, 0.54)',
            disabledDark: 'rgba(0, 0, 0, 0.38)',
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <>
                <CssBaseline />
                <Router>
                    <Switch>
                        <Route path="/notes/:uuid">
                            <Note />
                        </Route>
                        <Route path="/folders/:uuid">
                            <Folder />
                        </Route>
                        <Route exact path="">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </>
        </ThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);