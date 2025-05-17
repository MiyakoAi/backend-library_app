import express from "express";
import { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff } from "../controllers/staffController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();

router.get("/", verifyToken, authorizeRole("admin"), getAllStaff); // admin
router.get("/:id", verifyToken, authorizeRole("admin"), getStaffById); // admin
router.post("/", verifyToken, authorizeRole("admin"), createStaff); // admin
router.put("/:id", verifyToken, authorizeRole("admin"), updateStaff); // admin
router.delete("/:id", verifyToken, authorizeRole("admin"), deleteStaff); // admin

export default router;