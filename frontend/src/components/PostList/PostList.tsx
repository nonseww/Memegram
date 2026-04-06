import { MasonryGrid } from "@/ui/MasonryGrid";
import { PostCardBase } from "../PostCardBase";
import type { Post } from "@/types/post";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { PostModal } from "../PostModal";

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const selectedPost = postId
    ? (posts.find((p) => p.id === +postId) ?? null)
    : null;
  const handleCloseModal = () => {
    navigate("/");
  };

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
    <>
      <MasonryGrid>
        {posts.map((post) => (
          <PostCardBase key={post.id} post={post} />
        ))}
      </MasonryGrid>

      <PostModal
        open={!!selectedPost}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </>
  );
};
