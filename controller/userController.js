import { insertUser, getUsers, updateUserById, deleteUserById } from '../models/userModel.js';

export const addUser = (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
    }

    insertUser(username, email, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Database error while adding user' });
        }
        res.json({ message: 'User added successfully', userId: result.insertId });
    });
};

export const listUsers = (req, res) => {
    getUsers((err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Database error fetching users' });
        }
        res.json(users);
    });
};

export const updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    updateUserById(userId, userData, (err, result) => {
        if (err) return res.status(500).json({ message: 'Update failed', error: err });
        res.status(200).json({ message: 'User updated successfully' });
    });
};

// Delete user
export const deleteUser = (req, res) => {
    const userId = req.params.id;

    deleteUserById(userId, (err, result) => {
        if (err) return res.status(500).json({ message: 'Delete failed', error: err });
        res.status(200).json({ message: 'User deleted successfully' });
    });
};