import db from '../models/db.js';

// Get author by name
export const getAuthorByName = (name, callback) => {
    db.query('SELECT * FROM authors WHERE name = ?', [name], callback);
};

// Insert new author
export const insertAuthor = (name, bio, callback) => {
    db.query('INSERT INTO authors (name, bio) VALUES (?, ?)', [name, bio], callback);
};

// Existing insertBook for reference
export const insertBook = (title, genre, author_id, callback) => {
    db.query(
        'INSERT INTO books (title, genre, author_id) VALUES (?, ?, ?)',
        [title, genre, author_id],
        callback
    );
};

export const updateAuthorBio = (author_id, bio, callback) => {
    const query = 'UPDATE authors SET bio = ? WHERE author_id = ?';
    db.query(query, [bio, author_id], callback);
};