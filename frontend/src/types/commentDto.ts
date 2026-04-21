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
