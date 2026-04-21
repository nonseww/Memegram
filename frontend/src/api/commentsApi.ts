import type {
  Comment,
  CreateCommentDto,
  UpdateCommentDto,
} from "@/types/commentDto";
import api from "./axios";

export const commentsApi = {
  getByPostId: async (postId: number): Promise<Comment[]> => {
    const { data } = await api.get(`/comments/${postId}`);
    return data;
  },

  createComment: async (dto: CreateCommentDto): Promise<Comment> => {
    const { data } = await api.post("/comments", dto);
    return data;
  },
};
