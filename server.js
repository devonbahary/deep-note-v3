require('dotenv').config();
import express from 'express';
import './database/mysql-connect';
import folders from './routes/folders';
import notes from './routes/notes';

const { PORT } = process.env;

const app = express();

app.use(express.json())

app.use(express.static('dist'));

app.use('/folders', folders);
app.use('/notes', notes);

if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});