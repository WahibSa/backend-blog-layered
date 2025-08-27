import User from "../models/User.js";

export const createUser = async (userData) => {
  const user = new User(userData);
  console.log("Creating user:", user);
  await user.save();
  return user;
};

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const findUserByUsername = async (username) => {
  return User.findOne({ username });
};
