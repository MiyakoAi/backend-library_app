import express from 'express';
import { fetchBookByISBN } from '../controllers/externalBooks.js';

const router = express.Router();

// GET /api/fetch-book/:isbn
router.get('/fetch-book/:isbn', fetchBookByISBN);

export default router;
