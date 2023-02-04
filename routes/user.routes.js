
import express from "express";
import { createUser, login, logout } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", createUser)

router.post("/login", login)

router.delete("/logout", logout)

export default router;