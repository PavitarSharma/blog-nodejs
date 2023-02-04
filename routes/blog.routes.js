
import express from "express";
import { createBlog, deleteBlog, editBlog, getBlog } from "../controllers/blog.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createBlog)

router.get("/", auth, getBlog)

router.put("/", auth, editBlog)

router.delete("/", auth, deleteBlog)

export default router;