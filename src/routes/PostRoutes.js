import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostBySlug,
  getPostsByCategory,
  getPostsByAuthor,
  updatePostById,
  deletePostById,
  likePost,
  unlikePost,
} from "../controllers/PostController.js";

const router = express.Router();

// Create a new post
router.post("/", createPost);

// Get all posts
router.get("/", getAllPosts);

// Get post by slug (this should come before /:id to avoid conflicts)
router.get("/slug/:slug", getPostBySlug);

// Get posts by category
router.get("/category/:categoryId", getPostsByCategory);

// Get posts by author
router.get("/author/:authorId", getPostsByAuthor);

// Get post by ID
router.get("/:id", getPostById);

// Update post by ID
router.put("/:id", updatePostById);

// Delete post by ID
router.delete("/:id", deletePostById);

// Like post
router.patch("/:id/like", likePost);

// Unlike post
router.patch("/:id/unlike", unlikePost);

export default router;
