import * as followSercvice from "../services/FollowService.js";

export const followUser = async (req, res) => {
  try {
    const followed = await followSercvice.createFollow(req.body);
    res.status(200).json(followed);
  } catch (error) {
    res.status(400).json(error);
  }
};
