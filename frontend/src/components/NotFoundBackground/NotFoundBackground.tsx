import classes from "./NotFoundBackground.module.scss";
import { Box, Typography } from "@mui/material";

export const NotFoundBackground = () => (
  <Box className={classes.background}>
    <Typography
      variant="h1"
      color="white"
      sx={{
        textAlign: "center",
        zIndex: 1,
        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
      }}
    >
      Окак
    </Typography>
  </Box>
);
