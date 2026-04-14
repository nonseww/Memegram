import { LazyImageGuard } from "@/ui/LazyImageGuard";
import { Overlay } from "@/ui/Overlay";
import { Edit, PhotoCamera } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import v from "@/styles/_variables.module.scss";

interface ProfileHeaderProps {
  coverUrl: string;
  avatarUrl: string;
  name: string;
  username: string;
  isFollowing: boolean;
  isEditing: boolean;
  isOwnProfile: boolean;
  onEdit: () => void;
  onNameChange: (value: string) => void;
  onBgClick: () => void;
  onAvatarClick: () => void;
  onFollow: () => void;
}

export const ProfileHeader = ({
  coverUrl,
  avatarUrl,
  name,
  username,
  isFollowing,
  isEditing,
  isOwnProfile,
  onEdit,
  onNameChange,
  onBgClick,
  onAvatarClick,
  onFollow,
}: ProfileHeaderProps) => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          cursor: isEditing ? "pointer" : "default",
          overflow: "hidden",
        }}
        onClick={isEditing ? onBgClick : undefined}
      >
        <LazyImageGuard
          src={coverUrl}
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
              src={coverUrl}
              sx={{
                ...lazyProps.sx,
                width: "100%",
                height: { xs: "150px", md: "200px" },
                objectFit: "cover",
              }}
            />
          )}
        </LazyImageGuard>

        {isEditing && (
          <Overlay>
            <PhotoCamera />
            <Typography variant="caption">Изменить обложку</Typography>
          </Overlay>
        )}
      </Box>

      <Box
        sx={{
          position: "relative",
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, lg: 4 },
          zIndex: 3,
        }}
      >
        {isOwnProfile && !isEditing && (
          <IconButton
            sx={{ position: "absolute", right: 10, top: 20, zIndex: 10 }}
            color="primary"
            onClick={onEdit}
          >
            <Edit />
          </IconButton>
        )}

        {!isOwnProfile && (
          <Button
            onClick={onFollow}
            sx={{
              backgroundColor: v.mainPurple,
              color: "white",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              position: "absolute",
              right: "10px",
              zIndex: 3,
            }}
          >
            {isFollowing ? "Отписаться" : "Подписаться"}
          </Button>
        )}

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
          <Box
            sx={{
              height: { xs: "80px", md: "100px", lg: "150px" },
              width: { xs: "80px", md: "100px", lg: "150px" },
              position: "relative",
              cursor: isEditing ? "pointer" : "default",
              zIndex: 3,
            }}
            onClick={isEditing ? onAvatarClick : undefined}
          >
            <Avatar
              src={avatarUrl}
              sx={{
                border: "2px solid black",
                boxShadow: 3,
                height: { xs: "80px", md: "100px", lg: "150px" },
                width: { xs: "80px", md: "100px", lg: "150px" },
              }}
            />
            {isEditing && (
              <Overlay borderRadius="50%">
                <PhotoCamera />
              </Overlay>
            )}
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
            {isEditing ? (
              <TextField
                label="Имя:"
                fullWidth
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
              />
            ) : (
              <Typography
                variant="h5"
                sx={{ width: "100%", textAlign: "center" }}
              >
                {name}
              </Typography>
            )}
            {!isEditing && (
              <Typography
                color="text.secondary"
                sx={{ ml: "auto" }}
                variant="body2"
              >
                @{username}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
