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

app.post('/biodata', (req, res) => {

    const { nama, alamat, agama } = req.body;

    if (!nama || !alamat || !agama) {
        return res.status(400).json({ message: 'Nama, alamat, dan agama harus diisi' });
    }
    
    const sql = "INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)";
    const values = [nama, alamat, agama];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Gagal menyimpan data ke database', error: err });
        }
        res.status(201).json({ 
            message: 'Data biodata berhasil ditambahkan', 
            data: { id: result.insertId, ...req.body } 
        });
    });
});