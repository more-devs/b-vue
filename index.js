const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) return console.log('Error de conexión: ', err);
    console.log('Conexión exitosa a la base de datos');
});

app.get('/personas', (req, res) => {
    db.query('SELECT * FROM personas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/personas', (req, res) => {
    const { nombre, edad } = req.body;
    db.query('INSERT INTO personas (nombre, edad) VALUES (?, ?)', [nombre, edad], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, nombre, edad });
    });
});

app.put('/personas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    db.query('UPDATE personas SET nombre=?, edad=? WHERE id=?', [nombre, edad, id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

app.delete('/personas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM personas WHERE id=?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
