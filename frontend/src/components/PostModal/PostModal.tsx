import type { Post } from "@/types/post";
import { CommentButton, HeartButton } from "@/ui";
import { Modal } from "@/ui/Modal";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import v from "@/styles/_variables.module.scss";
import { Link } from "react-router-dom";
import { CommentsSection } from "../CommentsSection";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
  open: boolean;
  // onFollow: () => void;
  // isFollowing: boolean;
}

export const PostModal = ({
  post,
  open,
  onClose,
  // onFollow,
  // isFollowing,
}: PostModalProps) => {
  if (!post) return null;

  return (
    <Modal open={open} onClose={onClose} maxWidth="lg">
      <Box
        component="article"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <AuthorHeader post={post} display={{ xs: "flex", md: "none" }} />
        <Paper
          elevation={5}
          sx={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={post.meme}
            sx={{
              height: "auto",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Paper>

        <Box
          component="aside"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <AuthorHeader post={post} display={{ xs: "none", md: "flex" }} />
          <Divider />

          <Stack spacing={3}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {post.title}
            </Typography>
            <Typography>{post.description}</Typography>
          </Stack>

          <Box
            sx={{ mt: "auto", display: "flex", flexDirection: "row", gap: 3 }}
            component="footer"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <HeartButton isLiked={post.isLiked} onClick={() => {}} />
              <Typography component="span">{post.likesCount}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CommentButton onClick={() => {}} />
              <Typography component="span">{post.commentsCount}</Typography>
            </Box>
          </Box>

          <CommentsSection postId={post.id} />
        </Box>
      </Box>
    </Modal>
  );
};

const AuthorHeader = ({
  post,
  display,
}: {
  post: Post;
  display: { xs: string; md: string };
}) => (
  <Box
    component="header"
    sx={{
      display: display,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      mt: 4,
    }}
  >
    <Box
      component={Link}
      to={`/profile/${post.authorUsername}`}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Avatar src={post.authorPfp} />
      <Typography component="span" fontWeight={600}>
        {post.authorName}
      </Typography>
    </Box>

    <Button
      sx={{
        backgroundColor: v.mainPurple,
        color: "white",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      Подписаться
    </Button>
  </Box>
);
