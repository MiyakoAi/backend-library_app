import express from "express";
import { getRiwayatMahasiswa } from "../controllers/mahasiswaController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();

router.get("/mahasiswa/peminjaman-ku", verifyToken, authorizeRole("mahasiswa"), getRiwayatMahasiswa);

export default router;
