import { followUser, unfollowUser } from "../controllers/FollowController.js";
import express from "express";

const router = express.Router();

router.post("/", followUser);
router.delete("/", unfollowUser);

export default router;
