import express from 'express';
import { addBook } from '../controller/bookController.js';

const router = express.Router();

router.post('/add-book', addBook);

export default router;
