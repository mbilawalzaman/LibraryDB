import db from '../models/db.js';

// Insert a new author
export const insertAuthor = (name, bio, callback) => {
    const query = 'INSERT INTO authors (name, bio) VALUES (?, ?)';
    db.query(query, [name, bio], (err, result) => {
        callback(err, result);
    });
};

// Get all authors
export const getAuthors = (callback) => {
    const query = 'SELECT * FROM authors';
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

export const getAuthorById = (author_id, callback) => {
    const query = 'SELECT * FROM authors WHERE author_id = ?';
    db.query(query, [author_id], (err, results) => {
        if (err) return callback(err);

        // If no result, send null
        callback(null, results[0] || null);
    });
};

export const updateAuthorById = (author_id, name, bio, callback) => {
    const query = 'UPDATE authors SET name = ?, bio = ? WHERE author_id = ?';
    db.query(query, [name, bio, author_id], (err, result) => {
        callback(err, result);
    });
};

export const deleteAuthorById = (author_id, callback) => {
    const query = 'DELETE FROM authors WHERE author_id = ?';
    db.query(query, [author_id], (err, result) => {
        callback(err, result);
    });
}