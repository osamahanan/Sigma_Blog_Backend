import express from "express";
import { deleteBlog, editBlog, getBlog, getSingleBlog, SaveBlog } from "./Controller.js";

const router = express.Router()

router.post("/save/blog",SaveBlog)
router.get("/get/blog",getBlog)
router.get("/get/blog/:id",getSingleBlog)
router.delete("/delete/blog/:id",deleteBlog)
router.put("/edit/blog/:id",editBlog)

export default router