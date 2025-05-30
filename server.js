import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import bookRoutes from './routes/bookRoutes.js';
import viewRoutes from './routes/viewRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authorRoutes from './routes/authorRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

// Built-in body parser, no need for body-parser package
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Mount routes with explicit paths (optional but better for clarity)
app.use('/books', bookRoutes);
app.use('/', viewRoutes);
app.use('/users', userRoutes);
app.use('/authors', authorRoutes);



app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
