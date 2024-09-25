const mysql = require('mysql2/promise');

//db connection
const connection = mysql.createPool(

    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'test'

    }
);

    module.exports = connection;