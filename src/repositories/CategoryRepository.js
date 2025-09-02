import Category from "../models/Category.js";

const insertCategory = async (categoryData) => {
  const category = new Category(categoryData);
  category.slug = category.title.replace(/\s+/g, "-").toLowerCase();
  return await category.save();
};

const getAllCategories = async (skip, limit) => {
  return await Category.find().skip(skip).limit(limit);
};

const getCategoryBySlug = async (slug) => {
  return await Category.findOne({ slug });
};

const getCategoryById = async (id) => {
  return await Category.findById(id);
};

const updateCategory = async (id, categoryData) => {
  return await Category.findByIdAndUpdate(id, categoryData, { new: true });
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};
