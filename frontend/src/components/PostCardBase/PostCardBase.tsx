import type { Post } from "@/types/post";
import { HeartButton } from "@/ui";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import { StyledCard } from "@/ui/StyledCard";
import { Overlay } from "@/ui/Overlay";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface PostCardBaseProps {
  post: Post;
}

export const PostCardBase = ({ post }: PostCardBaseProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  return (
    <>
      <StyledCard onClick={() => setIsModalOpen(true)}>
        <Box sx={{ position: "relative" }}>
          <CardMedia component="img" image={post.meme} alt={post.title} />

          <Overlay borderRadius="15px">
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                Посмотреть
              </Typography>
              <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
                <HeartButton isLiked={isLiked} onClick={handleLike} />
              </Box>
            </Box>
          </Overlay>
        </Box>
      </StyledCard>
    </>
  );
};
