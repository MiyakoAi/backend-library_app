import express from 'express';
import { createBuku } from '../controllers/bookController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';
import { getAllBuku, getBukuById, updateBuku, deleteBuku } from '../controllers/books.js';

const router = express.Router();

router.post('/', verifyToken, authorizeRole('admin'), createBuku); // admin
router.get('/', getAllBuku);
router.get('/:id', getBukuById);
router.put('/:id', verifyToken, authorizeRole('admin'), updateBuku); // admin
router.delete('/:id',verifyToken, authorizeRole('admin'), deleteBuku); // admin

export default router;
