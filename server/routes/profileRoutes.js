import { Router } from "express";
import {
    getProfile,
    login,
    register,
} from "../controllers/profileControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", authMiddleware, getProfile);

export default router;
