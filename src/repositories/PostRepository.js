import Post from "../models/Post.js";

export const createPost = async (postData) => {
  const post = new Post(postData);
  await post.save();
  return post;
};

export const findAllPosts = async () => {
  return Post.find()
    .populate("author", "username full_name")
    .populate("category", "name");
};

export const findPostById = async (id) => {
  return Post.findById(id)
    .populate("author", "username full_name")
    .populate("category", "name");
};

export const findPostBySlug = async (slug) => {
  return Post.findOne({ slug })
    .populate("author", "username full_name")
    .populate("category", "name");
};

export const findPostsByCategory = async (categoryId) => {
  return Post.find({ category: categoryId })
    .populate("author", "username full_name")
    .populate("category", "name");
};

export const findPostsByAuthor = async (authorId) => {
  return Post.find({ author: authorId })
    .populate("author", "username full_name")
    .populate("category", "name");
};

export const updatePostById = async (id, updateData) => {
  return Post.findByIdAndUpdate(id, updateData, { new: true })
    .populate("author", "username full_name")
    .populate("category", "name");
};

export const deletePostById = async (id) => {
  return Post.findByIdAndDelete(id);
};

export const incrementLikes = async (id) => {
  return Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
    .populate("author", "username full_name")
    .populate("category", "name");
};

export const decrementLikes = async (id) => {
  return Post.findByIdAndUpdate(id, { $inc: { likes: -1 } }, { new: true })
    .populate("author", "username full_name")
    .populate("category", "name");
};
