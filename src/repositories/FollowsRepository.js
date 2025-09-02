import Follow from "../models/Follow.js";

export const createFollow = async (followerId, followingId) => {
  const follow = new Follow({
    follower_id: followerId,
    following_id: followingId,
  });
  await follow.save();
  return follow;
};

export const deleteFollow = async (followerId, followingId) => {
  return Follow.findOneAndDelete({
    follower_id: followerId,
    following_id: followingId,
  });
};

export const findFollowers = async (userId) => {
  return Follow.find({ following_id: userId }).populate("follower");
};

export const findFollowing = async (userId) => {
  return Follow.find({ follower_id: userId }).populate("followed");
};

export const findFollows = async (followerId, followingId) => {
  return Follow.find({
    follower_id: followerId,
    following_id: followingId,
  });
};
