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

export const updateUserById = (id, userData, callback) => {
    const { username, email } = userData;
    const query = 'UPDATE users SET username = ?, email = ? WHERE user_id = ?';
    db.query(query, [username, email, id], (err, result) => {
        callback(err, result);
    });
};

// Delete user by ID
export const deleteUserById = (id, callback) => {
    const query = 'DELETE FROM users WHERE user_id = ?';
    db.query(query, [id], (err, result) => {
        callback(err, result);
    });
};