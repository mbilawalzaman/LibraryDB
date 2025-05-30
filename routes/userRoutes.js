import express from 'express';
import { addUser, listUsers } from '../controller/userController.js';

const router = express.Router();

router.post('/add-user', addUser);
router.get('/getAllUsers', listUsers);

export default router;
