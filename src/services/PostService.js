import * as postRepository from "../repositories/PostRepository.js";
import * as categoryRepository from "../repositories/CategoryRepository.js";
import * as userRepository from "../repositories/UserRepository.js";

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export const createPost = async (postData) => {
  // Validate required fields
  if (
    !postData.title ||
    !postData.content ||
    !postData.category ||
    !postData.author
  ) {
    throw new Error("Title, content, category, and author are required");
  }

  // Validate category exists
  const category = await categoryRepository.findCategoryById(postData.category);
  if (!category) {
    throw new Error("Category not found");
  }

  // Validate author exists
  const author = await userRepository.findUserById(postData.author);
  if (!author) {
    throw new Error("Author not found");
  }

  // Generate slug if not provided
  if (!postData.slug) {
    postData.slug = generateSlug(postData.title);
  }

  // Check if slug already exists
  const existingPost = await postRepository.findPostBySlug(postData.slug);
  if (existingPost) {
    // Add timestamp to make slug unique
    postData.slug = `${postData.slug}-${Date.now()}`;
  }

  const post = await postRepository.createPost(postData);
  return post;
};

export const findAllPosts = async () => {
  const posts = await postRepository.findAllPosts();
  if (!posts || posts.length === 0) {
    throw new Error("No posts found");
  }
  return posts;
};

export const findPostById = async (id) => {
  // Validate MongoDB ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid post ID format");
  }

  const post = await postRepository.findPostById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

export const findPostBySlug = async (slug) => {
  if (!slug) {
    throw new Error("Slug is required");
  }

  const post = await postRepository.findPostBySlug(slug);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

export const findPostsByCategory = async (categoryId) => {
  // Validate MongoDB ObjectId format
  if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid category ID format");
  }

  // Validate category exists
  const category = await categoryRepository.findCategoryById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }

  const posts = await postRepository.findPostsByCategory(categoryId);
  if (!posts || posts.length === 0) {
    throw new Error("No posts found for this category");
  }
  return posts;
};

export const findPostsByAuthor = async (authorId) => {
  // Validate MongoDB ObjectId format
  if (!authorId.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid author ID format");
  }

  // Validate author exists
  const author = await userRepository.findUserById(authorId);
  if (!author) {
    throw new Error("Author not found");
  }

  const posts = await postRepository.findPostsByAuthor(authorId);
  if (!posts || posts.length === 0) {
    throw new Error("No posts found for this author");
  }
  return posts;
};

export const updatePostById = async (id, updateData) => {
  // Validate MongoDB ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid post ID format");
  }

  // Check if post exists
  const existingPost = await postRepository.findPostById(id);
  if (!existingPost) {
    throw new Error("Post not found");
  }

  // If title is being updated, regenerate slug
  if (updateData.title && updateData.title !== existingPost.title) {
    updateData.slug = generateSlug(updateData.title);

    // Check if new slug already exists (excluding current post)
    const existingSlugPost = await postRepository.findPostBySlug(
      updateData.slug
    );
    if (existingSlugPost && existingSlugPost._id.toString() !== id) {
      updateData.slug = `${updateData.slug}-${Date.now()}`;
    }
  }

  // Validate category if provided
  if (updateData.category) {
    const category = await categoryRepository.findCategoryById(
      updateData.category
    );
    if (!category) {
      throw new Error("Category not found");
    }
  }

  const post = await postRepository.updatePostById(id, updateData);
  return post;
};

export const deletePostById = async (id) => {
  // Validate MongoDB ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid post ID format");
  }

  const post = await postRepository.deletePostById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

export const likePost = async (id) => {
  // Validate MongoDB ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid post ID format");
  }

  // Check if post exists
  const existingPost = await postRepository.findPostById(id);
  if (!existingPost) {
    throw new Error("Post not found");
  }

  const post = await postRepository.incrementLikes(id);
  return post;
};

export const unlikePost = async (id) => {
  // Validate MongoDB ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid post ID format");
  }

  // Check if post exists
  const existingPost = await postRepository.findPostById(id);
  if (!existingPost) {
    throw new Error("Post not found");
  }

  // Prevent negative likes
  if (existingPost.likes <= 0) {
    throw new Error("Cannot unlike a post with no likes");
  }

  const post = await postRepository.decrementLikes(id);
  return post;
};
