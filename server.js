require('dotenv').config();
import express from 'express';
import './database/mysql-connect';

const { PORT } = process.env;

const app = express();

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});