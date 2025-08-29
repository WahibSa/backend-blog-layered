import User from "../models/User.js";
import * as followRepository from "../repositories/FollowsRepository.js";

export const createFollow = async (users) => {
  if (!users) {
    throw new Error("ID required");
  }
  const userId = [users.following_id, users.follower_id];
  const exitstUsers = User.find({
    _id: { $in: userId },
  });

  if (!exitstUsers) {
    throw new Error("Users not found");
  }

  const followed = await followRepository.createFollow(
    users.follower_id,
    users.following_id
  );

  if (!followed) {
    throw new Error("Failed to follow user");
  }

  return followed;
};
