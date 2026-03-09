import { PostCard } from "../PostCard/PostCard";
import type { Post } from "../../types/post";
import classes from "./PostList.module.scss";

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
  if (posts.length === 0) {
    return <div>Здесь ничего нет...</div>;
  }

  return (
    <div className={classes.posts}>
      {posts.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  );
};
