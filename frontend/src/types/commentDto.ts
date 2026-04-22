export interface CommentApi {
  id: number;
  user_id: number;
  post_id: number;
  text: string;
  created_at: string;
}

export interface Comment {
  id: number;
  userId: number;
  postId: number;
  text: string;
  createdAt: string;
}

export interface CreateCommentDto {
  postId: number;
  text: string;
}

export type UpdateCommentDto = Partial<CreateCommentDto>;
