import * as categoryRepository from "../repositories/CategoryRepository.js";

const createCategory = async (categoryData) => {
  return await categoryRepository.insertCategory(categoryData);
};

const getCategories = async (data) => {
  const { page = 1, limit = 10 } = data;
  if (limit > 25) {
    throw new Error("Limit exceeds maximum allowed");
  }

  const skip = (page - 1) * limit;

  return await categoryRepository.getAllCategories(skip, limit);
};

const getCategoryBySlug = async (slug) => {
  if (!slug) {
    throw new Error("Slug is required");
  }
  return await categoryRepository.getCategoryBySlug(slug);
};

const updateCategory = async (id, categoryData) => {
  return await categoryRepository.updateCategory(id, categoryData);
};

const deleteCategory = async (id) => {
  return await categoryRepository.deleteCategory(id);
};
