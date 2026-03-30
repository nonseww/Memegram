import { MOCK_POSTS } from "@/utils/mockPosts";
import { PostList } from "@/components/PostList";

export const Posts = () => {
  return <PostList posts={MOCK_POSTS} />;
};
