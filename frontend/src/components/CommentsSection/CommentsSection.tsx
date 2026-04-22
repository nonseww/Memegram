import { useTypedDispatch, useTypedSelector } from "@/store/hooks";
import {
  clearCommentsForPost,
  createCommentThunk,
  fetchCommentsByPostIdThunk,
} from "@/store/slices/commentsSlice";
import { Comment } from "@/ui/Comment";
import { MultilineTextField } from "@/ui/MultilineTextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

export const CommentsSection = ({ postId }: { postId: number }) => {
  const dispatch = useTypedDispatch();
  const { comments, isInitLoading, error } = useTypedSelector(
    (state) => state.comments,
  );
  const [text, setText] = useState<string>("");

  useEffect(() => {
    dispatch(fetchCommentsByPostIdThunk(postId));

    return () => {
      dispatch(clearCommentsForPost(postId));
    };
  }, [dispatch, postId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const resultAction = await dispatch(
      createCommentThunk({
        postId,
        text: text.trim(),
      }),
    );

    if (createCommentThunk.fulfilled.match(resultAction)) {
      setText("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {isInitLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 2,
          }}
        >
          <CircularProgress size={28} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : comments.length === 0 ? (
        <Typography color="text.secondary">Комментариев пока нет</Typography>
      ) : (
        <Box sx={{ height: "150px", overflowY: "auto" }}>
          <Stack spacing={2}>
            {comments.map((comment) => (
              <Box key={comment.id}>
                <Box
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <Comment
                    text={comment.text}
                    createdAt={comment.createdAt}
                    userId={comment.userId}
                  />
                </Box>
                <Divider sx={{ mt: 1.5 }} />
              </Box>
            ))}
          </Stack>
        </Box>
      )}
      <MultilineTextField
        value={text}
        onChange={setText}
        placeholder="Комментарий"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Отправить
      </Button>
    </Box>
  );
};
