import express from 'express';
import { addAuthor, listAuthors, getAuthorById, updateAuthor, deleteAuthor } from '../controller/authorController.js';

const router = express.Router();

router.post('/add-author', addAuthor);
router.get('/getAllauthors', listAuthors);
router.get('/:id', getAuthorById);
router.put('/updateAuthor/:id', updateAuthor);
router.delete('/deleteAuthor/:id', deleteAuthor);

export default router;
