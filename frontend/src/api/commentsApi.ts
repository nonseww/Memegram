import type { Comment, CommentApi, CreateCommentDto } from "@/types/commentDto";
import api from "./axios";

export const commentsApi = {
  getByPostId: async (postId: number): Promise<Comment[]> => {
    const { data } = await api.get(`/comments/${postId}`);
    return data.map((comment: CommentApi) => {
      return {
        text: comment.text,
        userId: comment.user_id,
        createdAt: comment.created_at,
        postId: comment.post_id,
      };
    });
  },

  createComment: async (dto: CreateCommentDto): Promise<Comment> => {
    const { data } = await api.post("/comments", {
      post_id: dto.postId,
      text: dto.text,
    });
    return {
      id: data.id,
      text: data.text,
      userId: data.user_id,
      createdAt: data.created_at,
      postId: data.post_id,
    };
  },
};
