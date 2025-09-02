import * as followService from "../services/FollowService.js";

export const followUser = async (req, res) => {
  try {
    const followed = await followService.createFollow(req.body);
    res.status(200).json(followed);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const unfollowed = await followService.deleteFollow(req.body);
    res.status(200).json(unfollowed);
  } catch (error) {
    res.status(400).json(error);
  }
};
