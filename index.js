const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3309',
    password: '@Aiszr131004',
    database: 'mahasiswa'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to Mysql: ' + err.stack);
        return;
    }
    console.log('Connected to Mysql successfully');
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});