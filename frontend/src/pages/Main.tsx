import { MOCK_POSTS } from "../utils/mockPosts";
import { PostList } from "../components/PostList";

export const Main = () => {
  return (
    <div>
      <PostList posts={MOCK_POSTS} />
    </div>
  );
};
