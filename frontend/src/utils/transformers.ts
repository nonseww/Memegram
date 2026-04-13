import type { UserProfile } from "@/types/user";

export interface UserProfileView {
  id: number;
  name: string;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  aboutText: string;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
  isOwnProfile: boolean;
  isFollowing: boolean;
}

export const toProfileView = (
  profile: UserProfile,
  isOwnProfile: boolean,
): UserProfileView => ({
  id: profile.id,
  name: profile.name,
  username: profile.username,
  avatarUrl: profile.avatarUrl || "/default-avatar.jpg",
  imageUrl: "/default-cover.jpg",
  aboutText: profile.about || "О себе не указано",
  postsCount: profile.postsCount,
  followersCount: profile.followersCount,
  followingsCount: profile.followingsCount,
  isOwnProfile,
  isFollowing: profile.isFollowing,
});
