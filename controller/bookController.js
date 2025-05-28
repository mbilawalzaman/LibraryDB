import { getAuthorByName, insertAuthor, insertBook } from '../models/bookModel.js';

export const addBook = (req, res) => {
    const { name, bio, title, genre } = req.body;

    // 1. Check if author exists
    getAuthorByName(name, (err, authors) => {
        if (err) {
            console.error('Error fetching author:', err);
            return res.status(500).send('Database error');
        }

        if (authors.length > 0) {
            const author_id = authors[0].author_id;
            const author_name = authors[0].name;
            console.log("Author Name--->", author_name);
            insertBook(title, genre, author_id, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error while adding book' });
                }
                res.json({ message: `Book added successfully for author ${author_name} and book ${title}` });
            });

        } else {
            insertAuthor(name, bio, (err, authorResult) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error while adding author' });
                }

                const author_id = authorResult.insertId;
                console.log(authorResult);

                insertBook(title, genre, author_id, (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database error while adding book' });
                    }
                    res.json({ message: `New author ${name} and book ${title} added successfully` });
                });
            });
        }
    });
};
