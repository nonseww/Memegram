import type { UserProfile } from "@/types/user";
import type { UpdateProfileDto } from "@/types/profileDto";
import api from "@/api/axios";

export const profileApi = {
  getUserByUsername: async (username: string): Promise<UserProfile> => {
    const { data } = await api.get(`/users/${username}`);
    return data;
  },

  updateProfile: async (dto: UpdateProfileDto): Promise<UserProfile> => {
    const { data } = await api.patch("/users/me", dto);
    return data;
  },

  toggleFollow: async (userId: number): Promise<{ isFollowing: boolean }> => {
    const { data } = await api.post(`/users/${userId}/follow`);
    return data;
  },
};
