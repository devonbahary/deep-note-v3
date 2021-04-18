require('dotenv').config();
import mysql from 'mysql';

const {
    MYSQL_HOST,
    MYSQL_PASSWORD,
    MYSQL_USERNAME,
} = process.env;

const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
});
 
connection.connect(err => {
    if (err) {
        console.error('error connecting to MySQL: ' + err.stack);
        return;
    }
 
    console.log(`connected to MySQL with thread id ${connection.threadId}`);
});
