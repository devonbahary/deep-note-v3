require('dotenv').config();
import express from 'express';
import './database/mysql-connect';

const { PORT } = process.env;

const app = express();

app.use(express.static('dist'));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});