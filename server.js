require('dotenv').config();
import express from 'express';
import './database/mysql-connect';
import folders from './routes/folders';

const { PORT } = process.env;

const app = express();

app.use(express.json())

app.use(express.static('dist'));

app.use('/folders', folders);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});