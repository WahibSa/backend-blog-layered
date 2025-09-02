import * as postService from "../services/PostService.js";

export const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.findAllPosts();
    res.status(200).json({
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await postService.findPostById(req.params.id);
    res.status(200).json({
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await postService.findPostBySlug(req.params.slug);
    res.status(200).json({
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const posts = await postService.findPostsByCategory(req.params.categoryId);
    res.status(200).json({
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsByAuthor = async (req, res) => {
  try {
    const posts = await postService.findPostsByAuthor(req.params.authorId);
    res.status(200).json({
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const post = await postService.updatePostById(req.params.id, req.body);
    res.status(200).json({
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const post = await postService.deletePostById(req.params.id);
    res.status(200).json({
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await postService.likePost(req.params.id);
    res.status(200).json({
      message: "Post liked successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post = await postService.unlikePost(req.params.id);
    res.status(200).json({
      message: "Post unliked successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
