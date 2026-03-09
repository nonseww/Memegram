import { PostCard } from "../PostCard/PostCard";
import type { Post } from "../../types/post";

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
  if (posts.length === 0) {
    return <div>Здесь ничего нет...</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  );
};
