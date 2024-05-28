// express.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Importar rutas
const userRoutes = require('./routes/userRoutes');

const app = express();

// Configuración de la base de datos
const dbConfig = require('./config/dbConfig');
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Middleware
app.use(bodyParser.json());

// Usar las rutas
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
