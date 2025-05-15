import express from 'express';
import {createBuku, getAllBuku, getBukuById, updateBuku, deleteBuku} from '../controllers/books.js';

const router = express.Router();

router.post('/', createBuku);
router.get('/', getAllBuku);
router.get('/:id', getBukuById);
router.put('/:id', updateBuku);
router.delete('/:id', deleteBuku);

export default router;
