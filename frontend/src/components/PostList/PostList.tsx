import { MasonryGrid } from "@/ui/MasonryGrid";
import { PostCardBase } from "../PostCardBase";
import type { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
  return (
    <>
      <MasonryGrid>
        {posts.map((post) => (
          <PostCardBase key={post.id} post={post} />
        ))}
      </MasonryGrid>
    </>
  );
};
