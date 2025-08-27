import * as userService from "../services/UserService.js";

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
