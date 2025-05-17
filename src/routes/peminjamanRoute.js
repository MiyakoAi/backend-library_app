import express from "express";
import { createPeminjaman } from "../controllers/peminjamanController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();

// Hanya staff yang bisa meminjamkan buku
router.post("/peminjaman", verifyToken, authorizeRole("staff"), createPeminjaman);

export default router;
