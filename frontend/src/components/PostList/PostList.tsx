import { PostCard } from "../PostCard/PostCard";
import type { Post } from "../../types/post";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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
    <Stack
      component="section"
      spacing={3}
      sx={{ width: { xs: "85vw", sm: "500px" }, mx: "auto" }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </Stack>
  );
};
