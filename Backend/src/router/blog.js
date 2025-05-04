const express = require("express");
const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/blogCategory");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { createBlogContent } = require("../controller/blogContent");
const blogRouter = express.Router();

blogRouter
  .route("/blog-category")
  .get(getCategory)
  .post(isAuthenticated, isAdmin, createCategory)
  .put(isAuthenticated, isAdmin, updateCategory)
  .delete(isAuthenticated, isAdmin, deleteCategory);

blogRouter
  .route("/")
  .get(getBlog)
  .post(isAuthenticated, createBlog)
  .put(isAuthenticated, updateBlog)
  .delete(isAuthenticated, deleteBlog);

blogRouter.route("/blog-content").post(isAuthenticated, createBlogContent);

module.exports = { blogRouter };
