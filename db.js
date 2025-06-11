const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'shinkansen.proxy.rlwy.net',
    user: 'root',
    password: 'MnvgmARhGRpmrROqGAVHFHEYwdGzbley',
    database: 'railway',
    port: 33520 // o el puerto que te da Railway
});

connection.connect((err) => {
    if (err) throw err;
    console.log('🟢 Conectado a la base de datos');
});

module.exports = connection;
