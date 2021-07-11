import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Folder } from './folder/components/Folder';
import { Home } from './home/Home';
import { Note } from './note/Note';

const generatePalette = (color) => ({ 500: color, main: color });

const theme = createMuiTheme({
    palette: {
        primary: {
            100: '#D8D7E3',
            500: '#4B4A54',
            900: '#13121B',
        },
        secondary: generatePalette('#7DB19F'),
        action: generatePalette('#BC7588'),
        info: generatePalette('#13121B'),
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