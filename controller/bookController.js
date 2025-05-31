import { getAuthorByName, insertAuthor, insertBook, updateAuthorBio, updateBook, deleteBook } from '../models/bookModel.js';


export const addBook = (req, res) => {
    const { name, bio, title, genre } = req.body;

    if (!name || !title) {
        return res.status(400).json({ message: 'Author name and book title are required' });
    }

    getAuthorByName(name, (err, authors) => {
        if (err) {
            console.error('Error fetching author:', err);
            return res.status(500).json({ message: 'Database error while checking author' });
        }

        if (authors.length > 0) {
            // ✅ Author exists
            const author_id = authors[0].author_id;
            const existingBio = authors[0].bio;

            // 🔄 Optional: update bio if it's different
            if (bio && bio !== existingBio) {
                updateAuthorBio(author_id, bio, (err) => {
                    if (err) {
                        console.error('Error updating bio:', err);
                        return res.status(500).json({ message: 'Error updating author bio' });
                    }
                });
            }

            insertBook(title, genre, author_id, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error inserting book' });
                }
                return res.json({ message: `Book "${title}" added for existing author "${name}"` });
            });

        } else {
            // 🆕 Author does not exist → insert author then book
            insertAuthor(name, bio || '', (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error inserting new author' });
                }

                const author_id = result.insertId;

                insertBook(title, genre, author_id, (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error inserting book' });
                    }
                    return res.json({ message: `New author "${name}" and book "${title}" added` });
                });
            });
        }
    });
};


export const updateBookbyId = (req, res) => {
    const { id } = req.params;
    const { title, genre } = req.body;

    if (!title || !genre) {
        return res.status(400).json({ message: 'Title and genre are required' });
    }

    updateBook(id, title, genre, (err, result) => {
        if (err) {
            console.error('Error updating book:', err);
            return res.status(500).json({ message: 'Database error while updating book' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book updated successfully' });
    });
};

// ✅ Delete book
export const deleteBookbyId = (req, res) => {
    const { id } = req.params;

    deleteBook(id, (err, result) => {
        if (err) {
            console.error('Error deleting book:', err);
            return res.status(500).json({ message: 'Database error while deleting book' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    });
};