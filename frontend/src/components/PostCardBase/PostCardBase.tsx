import type { Post } from "@/types/post";
import { HeartButton } from "@/ui";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import { StyledCard } from "@/ui/StyledCard";
import v from "@/styles/_variables.module.scss";

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
        <CardMedia component="img" image={post.meme} alt={post.title} />
        {/* <HeartButton isLiked={isLiked} onClick={handleLike} /> */}
      </StyledCard>
    </>
  );
};
