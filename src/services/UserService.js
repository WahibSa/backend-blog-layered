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
