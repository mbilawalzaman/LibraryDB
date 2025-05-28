import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAuthors, getBooks, getUsers } from '../controller/viewController.js';
import db from '../models/db.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/test-db', (req, res) => {
    db.ping(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'DB Connection failed' });
        }
        res.json({ success: true, message: 'DB Connected successfully' });
    });
});

router.get('/authors', getAuthors);
router.get('/books', getBooks);
router.get('/users', getUsers);

export default router;
