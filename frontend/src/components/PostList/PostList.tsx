import { MasonryGrid } from "@/ui/MasonryGrid";
import { PostCardBase } from "../PostCardBase";
import type { Post } from "@/types/post";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="textPrimary">
          Здесь ничего нет...
        </Typography>
      </Box>
    );
  }

  return (
    <MasonryGrid>
      {posts.map((post) => (
        <PostCardBase key={post.id} post={post} />
      ))}
    </MasonryGrid>
  );
};
