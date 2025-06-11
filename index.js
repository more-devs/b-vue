const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Rutas CRUD
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
    db.query('UPDATE personas SET nombre = ?, edad = ? WHERE id = ?', [nombre, edad, id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

app.delete('/personas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM personas WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
