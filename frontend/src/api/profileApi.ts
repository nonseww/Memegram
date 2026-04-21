import type { UserProfile } from "@/types/user";
import type { UpdateProfileDto } from "@/types/profileDto";
import api from "@/api/axios";

export const profileApi = {
  getUserByUsername: async (username: string): Promise<UserProfile> => {
    const { data } = await api.get(`/users/${username}`);
    return mapUserProfile(data);
  },

  updateProfile: async (dto: UpdateProfileDto): Promise<UserProfile> => {
    const { avatarUrl, coverUrl, ...rest } = dto;

    const payload: Record<string, any> = { ...rest };
    if (avatarUrl !== undefined) {
      payload.avatar_url = avatarUrl;
    }
    if (coverUrl !== undefined) {
      payload.cover_url = coverUrl;
    }

    const { data } = await api.patch("/users/me", payload);
    return mapUserProfile(data);
  },

  toggleFollow: async (userId: number): Promise<{ isFollowing: boolean }> => {
    const { data } = await api.post(`/users/${userId}/follow`);
    console.log("API response:", data);
    return data;
  },
};

const mapUserProfile = (data: any): UserProfile => {
  return {
    id: data.id,
    name: data.name,
    username: data.username,
    email: data.email,
    role: data.role,
    about: data.about,
    avatarUrl: data.avatar_url,
    coverUrl: data.cover_url,
    postsCount: data.postsCount,
    followersCount: data.followersCount,
    followingsCount: data.followingsCount,
    isFollowing: data.isFollowing ?? false,
  };
};
