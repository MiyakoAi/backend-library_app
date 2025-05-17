import express from 'express';
import {createMahasiswa, getAllMahasiswa, getMahasiswaById, updateMahasiswa, deleteMahasiswa} from '../controllers/mahasiswa.js';
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();

router.post('/',verifyToken, authorizeRole("admin"), createMahasiswa); // admin
router.get('/', getAllMahasiswa);
router.get('/:id', getMahasiswaById);
router.put('/:id',verifyToken, authorizeRole("admin"), updateMahasiswa); // admin
router.delete('/:id',verifyToken, authorizeRole("admin"), deleteMahasiswa); // admin

export default router;
