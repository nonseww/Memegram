import type { userProfile } from "../../types/userData";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Button,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import classes from "./UserProfile.module.scss";
import { InfoList } from "./InfoList";

interface UserProfileProps {
  userData: userProfile;
}

export const UserProfile = ({ userData }: UserProfileProps) => {
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 1, borderRadius: 4, position: "relative" }}>
        <Box
          className={classes.backgroundImage}
          sx={{
            width: "100%",
            backgroundImage: `url(${userData.imageUrl})`,
            position: "relative",
          }}
        />

        <Box sx={{ position: "relative", px: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              position: "relative",
              mt: -6,
            }}
          >
            <Avatar
              src={userData.avatarUrl}
              sx={{
                border: "2px solid black",
                boxShadow: 3,
              }}
              className={classes.avatar}
            />
            <IconButton
              sx={{ position: "absolute", right: 0, bottom: -10 }}
              color="primary"
            >
              <Edit />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
                mt: 2,
                mx: "auto",
              }}
            >
              <Typography
                variant="h5"
                sx={{ width: "100%", textAlign: "center" }}
              >
                {userData.name}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: "auto" }}
                variant="body2"
              >
                @{userData.username}
              </Typography>
            </Box>

            <Stack direction="column" spacing={1}>
              <Typography variant="h6" color="primary">
                О себе:
              </Typography>
              <Typography>{userData.aboutText}</Typography>
              <Divider sx={{ borderColor: "primary.main" }} />
            </Stack>

            <Stack>
              <InfoList
                labels={{
                  posts: `${userData.postsCount} posts`,
                  followers: `${userData.followersCount} followers`,
                  followings: `${userData.followingsCount} followings`,
                }}
              />
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
