import express from "express";
import {getAllPeminjaman, getPeminjamanById, getAllPengembalian, getPengembalianById} from "../controllers/adminRiwayatController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";


const router = express.Router();

// Hanya admin dan staff yang boleh akses
router.use(verifyToken, authorizeRole(["admin", "staff"]));

// Endpoint riwayat peminjaman
router.get("/peminjaman", getAllPeminjaman);
router.get("/peminjaman/:id", getPeminjamanById);

// Endpoint riwayat pengembalian
router.get("/pengembalian", getAllPengembalian);
router.get("/pengembalian/:id", getPengembalianById);

export default router;
