import { followUser } from "../controllers/FollowController.js";
import express from "express";

const router = express.Router();

router.post("/", followUser);

export default router;
