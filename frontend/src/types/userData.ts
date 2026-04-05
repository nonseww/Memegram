export interface UserProfile {
  id: number;
  name: string;
  username: string;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
  imageUrl: string;
  avatarUrl: string;
  aboutText: string;
  isOwnProfile?: boolean;
}
