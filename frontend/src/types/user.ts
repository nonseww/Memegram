export interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  role: string;
  avatarUrl?: string;
  imageUrl?: string;
  about?: string;
}

export interface UserProfile extends User {
  postsCount: number;
  followersCount: number;
  followingsCount: number;
  isFollowing: boolean;
}
