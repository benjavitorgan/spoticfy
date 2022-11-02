const mysql = require("mysql2");

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "spotify",
    password: "rootroot"
});

module.exports = conn;
