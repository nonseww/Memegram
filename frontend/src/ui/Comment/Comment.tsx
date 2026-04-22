import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

interface CommentProps {
  text: string;
  userId: number;
  createdAt: string;
}

export const Comment = ({ text, userId, createdAt }: CommentProps) => {
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography>user #{userId}</Typography>
        <Typography>{createdAt}</Typography>
      </Box>

      <Typography>{text}</Typography>
    </Card>
  );
};
