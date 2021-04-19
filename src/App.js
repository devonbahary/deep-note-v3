import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
    return (
        <div>
            <CssBaseline />
            <h1>Deep Note</h1>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);