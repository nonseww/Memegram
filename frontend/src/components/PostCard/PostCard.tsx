import type { Post } from "../../types/post";
import { calcDates } from "../../utils/calcDates";
import { isTooLongText } from "../../utils/isTooLongText";
import { updateText } from "../../utils/updateText";
import { HeartButton } from "../../ui/HeartButton";
import { CommentButton } from "../../ui/CommentButton";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import v from "/src/styles/_variables.module.scss";
import { useImageLazyLoad } from "../../hooks/useImageLazyLoad";
import { useInView } from "../../hooks/useInView";

interface PostCardProps {
  data: Post;
}

const limit = 50;

export const PostCard = ({ data }: PostCardProps) => {
  const isTooLongDescription = isTooLongText({
    description: data.description,
    limit: limit,
  });
  const [isLiked, setIsLiked] = useState(data.isLiked);
  const [likes, setLikes] = useState(data.likesCount);
  const { isInView, containerRef } = useInView("300px");
  const { isLoaded, isError, imageRef, handleLoad, handleError } =
    useImageLazyLoad(isInView ? data.meme : "");

  const COLORS = {
    cardColor: v.cardColor,
    mainBorder: "#e0e0e0",
    darkBorder: "#bdbdbd",
    mainPurple: "#8a2be2",
    secondaryPurple: "#7b1fa2",
  };

  //useTransition

  return (
    <Card
      component="article"
      ref={containerRef}
      sx={{
        width: "100%",
        minHeight: "450px",
        bgcolor: COLORS.cardColor,
        borderRadius: "25px",
        border: `1px solid ${COLORS.mainBorder}`,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 1)",
        py: "10px",
        pb: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <CardHeader
        sx={{
          px: { xs: "15px", sm: "25px" },
          py: { xs: "10px", sm: "15px" },
          alignItems: "center",
          "& .MuiCardHeader-content": { overflow: "hidden" },
        }}
        avatar={
          <Avatar
            src={data.authorPfp}
            sx={{
              width: { xs: 40, sm: 60 },
              height: { xs: 40, sm: 60 },
              border: `1px solid ${COLORS.darkBorder}`,
            }}
          />
        }
        title={
          <Link
            sx={{
              fontSize: { xs: "16px", sm: "22px" },
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {data.author}
          </Link>
        }
        action={
          <Typography
            sx={{
              fontSize: { xs: "13px", sm: "15px" },
              textAlign: "end",
              mt: 1,
            }}
          >
            {calcDates(data.date)}
          </Typography>
        }
      ></CardHeader>

      <Box sx={{ width: "100%" }}>
        {(!isInView || !isLoaded) && (
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.11)",
              height: { xs: "350px", md: "450px" },
            }}
            animation="wave"
          />
        )}
        {isInView && (
          <CardMedia
            component="img"
            ref={imageRef}
            image={data.meme}
            alt={data.title}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            sx={{
              width: "100%",
              height: isLoaded && !isError ? "auto" : 0,
              display: "block",
            }}
          />
        )}
        <CardContent sx={{ px: { xs: "15px", sm: "25px" }, py: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "20px", sm: "25px" },
              fontFamily: "JetBrains_Bold",
              textDecoration: "underline",
              mb: 4,
            }}
          >
            {data.title}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "18px" },
              display: "inline",
            }}
          >
            {isTooLongDescription
              ? updateText({ description: data.description, limit: limit })
              : data.description}
          </Typography>
          {isTooLongDescription && (
            <Link
              sx={{
                display: "block",
                mt: 1,
                fontFamily: "JetBrains_Bold",
                color: COLORS.secondaryPurple,
                fontSize: { xs: "17px", sm: "20px" },
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Читать полностью...
            </Link>
          )}
        </CardContent>
      </Box>

      <CardActions
        sx={{
          px: { xs: "5px", sm: "20px" },
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <HeartButton
            isLiked={isLiked}
            onClick={() => {
              if (isLiked) {
                setLikes((prev) => prev - 1);
              } else {
                setLikes((prev) => prev + 1);
              }
              setIsLiked((prev) => !prev);
            }}
          />
          <Typography
            sx={{
              color: COLORS.mainPurple,
              fontSize: { xs: "18px", sm: "20px" },
            }}
          >
            {likes}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CommentButton onClick={() => {}} />
          {data.commentsCount > 0 && (
            <Typography sx={{ fontSize: { xs: "18px", sm: "20px" } }}>
              {data.commentsCount}
            </Typography>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};
