import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // your password
    database: 'libraryDb'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL DB!');
});

export default db;
