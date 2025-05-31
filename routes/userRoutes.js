import express from 'express';
import { addUser, listUsers, updateUser, deleteUser } from '../controller/userController.js';

const router = express.Router();

router.post('/add-user', addUser);
router.get('/getAllUsers', listUsers);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;
