import express from "express";
import { getPeminjamanTerlambat } from "../controllers/peminjamanTerlambatController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();

router.get("/admin/peminjaman-terlambat", verifyToken, authorizeRole(["admin", "staff"]), getPeminjamanTerlambat);

export default router;
