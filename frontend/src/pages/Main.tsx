import { PostList } from "@/components/PostList";
import { PostModal } from "@/components/PostModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "@/store/hooks";
import { Loader } from "@/ui/Loader";
import { fetchPostsThunk } from "@/store/slices/postsSlice";

export const Main = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const { posts, isInitLoading, error } = useTypedSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    dispatch(fetchPostsThunk());
  }, [dispatch]);

  if (isInitLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if ((!isInitLoading && !error && !posts) || posts?.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="textPrimary">
          Здесь ничего нет...
        </Typography>
      </Box>
    );
  }

  const selectedPost = postId
    ? (posts?.find((p) => p.id === +postId) ?? null)
    : null;
  const handleCloseModal = () => {
    navigate("/");
  };

  return (
    <>
      <PostList posts={posts} />
      <PostModal
        open={!!selectedPost}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </>
  );
};
