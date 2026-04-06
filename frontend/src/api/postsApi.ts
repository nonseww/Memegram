import type { CreatePostDto, UpdatePostDto } from "@/types/postDto";
import api from "./axios";
import type { Post } from "@/types/post";

export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    const { data } = await api.get("/posts");
    return data;
  },

  getAllByUserId: async (userId: number): Promise<Post[]> => {
    const { data } = await api.get(`/posts/user/${userId}`);
    return data;
  },

  getOne: async (id: number): Promise<Post> => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  create: async (dto: CreatePostDto): Promise<Post> => {
    const { data } = await api.post("/posts", dto);
    return data;
  },

  update: async (dto: UpdatePostDto, id: number): Promise<Post> => {
    const { data } = await api.patch(`/posts/${id}`, dto);
    return data;
  },

  delete: async (id: number) => {
    await api.delete(`/posts/${id}`);
    return id;
  },
};
