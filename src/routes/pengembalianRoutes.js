import express from "express";
import { createPengembalian } from "../controllers/pengembalianController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";


const router = express.Router();

router.post("/pengembalian", verifyToken, authorizeRole("staff"), createPengembalian); // staff

export default router;
