import express from 'express';
import { addBook, updateBookbyId, deleteBookbyId } from '../controller/bookController.js';

const router = express.Router();

router.post('/add-book', addBook);
router.put('/updateBook/:id', updateBookbyId);
router.delete('/deleteBook/:id', deleteBookbyId);

export default router;
