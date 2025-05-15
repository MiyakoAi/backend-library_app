import express from 'express';
import {createMahasiswa, getAllMahasiswa, getMahasiswaById, updateMahasiswa, deleteMahasiswa} from '../controllers/mahasiswa.js';

const router = express.Router();

router.post('/', createMahasiswa);
router.get('/', getAllMahasiswa);
router.get('/:id', getMahasiswaById);
router.put('/:id', updateMahasiswa);
router.delete('/:id', deleteMahasiswa);

export default router;
