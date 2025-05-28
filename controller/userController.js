import { insertUser, getUsers } from '../models/userModel.js';

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
