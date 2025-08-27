import * as userRepository from "../repositories/UserRepository.js";
import bcrypt from "bcryptjs";

export const createUser = async (userData) => {
  if (
    !userData.email ||
    !userData.password ||
    !userData.username ||
    !userData.full_name
  ) {
    throw new Error("Email, password, full name, and username are required");
  }

  const existingEmail = await userRepository.findUserByEmail(userData.email);
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const existingUsername = await userRepository.findUserByUsername(
    userData.username
  );
  if (existingUsername) {
    throw new Error("Username already exists");
  }

  const newPassword = await bcrypt.hash(userData.password, 10);

  userData.password = newPassword;

  const user = await userRepository.createUser(userData);
  return user;
};

export const findAllUsers = async () => {
  const users = await userRepository.findAllUsers();
  if (!users || users.length === 0) {
    throw new Error("No users found");
  }
  return users;
};

export const findUserById = async (id) => {
  // Validate MongoDB ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid user ID format");
  }

  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const findUserByUsername = async (username) => {
  if (!username) {
    throw new Error("Username is required");
  }

  const user = await userRepository.findUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
