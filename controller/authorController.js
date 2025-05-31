import { insertAuthor, getAuthors, getAuthorById as fetchAuthorById, updateAuthorById, deleteAuthorById } from '../models/authorModel.js';

// Add an author controller
export const addAuthor = (req, res) => {
    const { name, bio } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Author name is required' });
    }

    insertAuthor(name, bio || '', (err, result) => {
        if (err) {
            console.error('Error inserting author:', err);
            return res.status(500).json({ message: 'Database error inserting author' });
        }
        res.status(201).json({ message: 'Author added successfully', authorId: result.insertId });
    });
};

// List authors controller
export const listAuthors = (req, res) => {
    getAuthors((err, authors) => {
        if (err) {
            console.error('Error fetching authors:', err);
            return res.status(500).json({ message: 'Database error fetching authors' });
        }
        res.json(authors);
    });
};

export const getAuthorById = (req, res) => {
    const { id } = req.params;

    fetchAuthorById(id, (err, author) => {
        if (err) {
            console.error('Error fetching author by ID:', err);
            return res.status(500).json({ message: 'Database error fetching author' });
        }
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
    });
};

export const updateAuthor = (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Author name is required' });
    }

    updateAuthorById(id, name, bio || '', (err, result) => {
        if (err) {
            console.error('Error updating author:', err);
            return res.status(500).json({ message: 'Database error updating author' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.json({ message: 'Author updated successfully' });
    });
};

export const deleteAuthor = async (req, res) => {
    const authorId = req.params.id;
    try {
        await deleteAuthorById(authorId, (err, result) => {

            if (err) {
                console.error('Error deleting author:', err);

                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(400).json({
                        message: 'Cannot delete the author because they have associated books. Please delete those books first.'
                    });
                }

                return res.status(500).json({ message: 'Database error deleting author' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Author not found' });
            }

            res.json({ message: 'Author deleted successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting author' });
    }
};
