export interface Post {
  id: number;
  title: string;
  date: string;
  authorName: string;
  authorUsername: string;
  authorPfp: string;
  authorId: number;
  meme: string;
  description: string;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  isEditable: boolean;
}
