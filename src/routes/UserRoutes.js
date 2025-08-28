import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  deleteUserById,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/profile/:username", getUserByUsername);
router.delete("/:id", deleteUserById);

export default router;
