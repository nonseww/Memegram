import type { userProfile } from "@/types/userData";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Edit from "@mui/icons-material/Edit";
import { InfoList } from "./InfoList";
import { LazyImageGuard } from "@/ui/LazyImageGuard";
import Skeleton from "@mui/material/Skeleton";

interface UserProfileProps {
  userData: userProfile;
}

export const UserProfile = ({ userData }: UserProfileProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        borderRadius: 4,
        position: "relative",
        width: { lg: "70dvw" },
        maxWidth: "1100px",
        mx: { lg: "auto" },
      }}
    >
      <LazyImageGuard
        src={userData.imageUrl}
        minHeight={150}
        viewHeight="0px"
        skeleton={
          <Skeleton
            variant="rectangular"
            width="100%"
            animation="wave"
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.11)",
              height: { xs: "150px", md: "200px" },
            }}
          />
        }
      >
        {(lazyProps) => (
          <Box
            {...lazyProps}
            component="img"
            src={userData.imageUrl}
            sx={{
              ...lazyProps.sx,
              width: "100%",
              height: { xs: "150px", md: "200px" },
              objectFit: "cover",
            }}
          />
        )}
      </LazyImageGuard>

      <Box
        sx={{
          position: "relative",
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, lg: 4 },
        }}
      >
        <IconButton
          sx={{ position: "absolute", right: 10, top: 20, zIndex: 10 }}
          color="primary"
        >
          <Edit />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", lg: "flex-end" },
            justifyContent: { xs: "center", lg: "flex-start" },
            position: "relative",
            mt: -6,
            gap: { lg: 4 },
          }}
        >
          <Box sx={{ position: "relative " }}>
            <Avatar
              src={userData.avatarUrl}
              sx={{
                border: "2px solid black",
                boxShadow: 3,
                height: { xs: "80px", md: "100px", lg: "150px" },
                width: { xs: "80px", md: "100px", lg: "150px" },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              mt: 2,
              mx: { xs: "auto", lg: 0 },
              pb: { xs: 0, lg: 2 },
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
    </Paper>
  );
};
