import db from '../models/db.js';

export const getAuthors = (req, res) => {
    db.query('SELECT * FROM authors', (err, results) => {
        if (err) return res.status(500).send('Error fetching authors');
        res.json(results);
    });
};

export const getBooks = (req, res) => {
    const query = `
        SELECT books.book_id, books.title, books.genre, authors.name AS author_name
        FROM books
        LEFT JOIN authors ON books.author_id = authors.author_id
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send(`Error fetching books: ${err.message}`);
        }
        res.json(results);
    });
};

export const getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send('Error fetching users');
        res.json(results);
    });
};
