export interface Post {
  id: number;
  title: string;
  date: string;
  author: string;
  authorPfp: string;
  meme: string;
  description: string;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
}
