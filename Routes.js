import express from "express";
import { deleteBlog, editBlog, getBlog, getSingleBlog, SaveBlog } from "./Controller.js";

const app = express()

app.post("/save/blog",SaveBlog)
app.get("/get/blog",getBlog)
app.get("/get/blog/:id",getSingleBlog)
app.delete("/delete/blog/:id",deleteBlog)
app.put("/edit/blog/:id",editBlog)

export default app