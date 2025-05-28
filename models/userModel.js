import db from '../models/db.js';

export const insertUser = (username, email, callback) => {
    const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
    db.query(query, [username, email], (err, result) => {
        callback(err, result);
    });
};

export const getUsers = (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

