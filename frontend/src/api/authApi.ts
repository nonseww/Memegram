import api, { API_URL } from "./axios";
import type { LoginDto } from "@/types/loginDto";
import type { RegisterDto } from "@/types/registerDto";
import type { User } from "@/types/user";
import axios from "axios";

interface authResponse {
  user: User;
  accessToken: string;
}

export const authApi = {
  login: async (dto: LoginDto) => {
    const { data } = await api.post<authResponse>("/auth/login", dto);
    return data;
  },

  register: async (dto: RegisterDto) => {
    const { data } = await api.post<authResponse>("/auth/register", dto);
    return data;
  },

  getMe: async () => {
    const { data } = await api.get<User>("/auth/me");
    return data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },

  refresh: async () => {
    const { data } = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    );
    return data;
  },
};
