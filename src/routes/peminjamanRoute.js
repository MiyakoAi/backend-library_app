import express from "express";
import { createPeminjaman } from "../controllers/peminjamanController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();

router.post("/peminjaman", verifyToken, authorizeRole("staff"), createPeminjaman); // staff

export default router;
