
require('dotenv').config()
const mysql = require('mysql2'); // buat konfigurasi koneksi
const koneksi = mysql.createConnection({
    // host: "127.0.0.1",
    // user: "root",
    // password: "",
    // database: "db",
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true
}); // koneksi database
koneksi.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = koneksi;