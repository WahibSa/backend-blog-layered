import User from "../models/User.js";
import * as followRepository from "../repositories/FollowsRepository.js";

export const createFollow = async (users) => {
  if (!users) {
    throw new Error("ID required");
  }
  const userId = [users.following_id, users.follower_id];

  const exitstUsers = await User.find({
    _id: { $in: userId },
  });
  if (!exitstUsers) {
    throw new Error("Users not found");
  }

  const alreadyFollow = await followRepository.findFollows(
    users.follower_id,
    users.following_id
  );

  if (alreadyFollow.length > 0) {
    console.log(alreadyFollow);
    throw new Error("Already following");
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

export const deleteFollow = async (users) => {
  if (!users) {
    throw new Error("ID required");
  }

  const unfollowed = await followRepository.deleteFollow(
    users.follower_id,
    users.following_id
  );

  if (!unfollowed) {
    throw new Error("Failed to unfollow user");
  }

  return unfollowed;
};
