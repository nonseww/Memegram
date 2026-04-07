import Paper from "@mui/material/Paper";
import { LazyImageGuard } from "@/ui/LazyImageGuard";
import type { UserProfile } from "@/types/userData";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { MultilineTextField } from "@/ui/MultilineTextField";
import Button from "@mui/material/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Overlay } from "@/ui/Overlay";
import { PhotoCamera } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

interface UserProfileProps {
  userData: UserProfile;
}

const MAXLENGTH = 300;

export const ProfileEdit = ({ userData }: UserProfileProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAction = () => navigate("/profile");

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
            sx={{ position: "relative", cursor: "pointer", overflow: "hidden" }}
            onClick={() => inputRef.current?.click()}
          >
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

            <input type="file" hidden ref={inputRef} accept="image/*" />

            <Overlay>
              <PhotoCamera />
              <Typography variant="caption">Изменить изображение</Typography>
            </Overlay>
          </Box>
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
              cursor: "pointer",
              zIndex: 3,
            }}
            onClick={() => inputRef.current?.click()}
          >
            <Avatar
              src={userData.avatarUrl}
              sx={{
                border: "2px solid black",
                boxShadow: 3,
                height: { xs: "80px", md: "100px", lg: "150px" },
                width: { xs: "80px", md: "100px", lg: "150px" },
              }}
            />
            <Overlay borderRadius="50%">
              <PhotoCamera />
            </Overlay>
          </Box>
        </Box>

        <TextField label="Имя:" fullWidth defaultValue={userData.name} />
        <MultilineTextField
          maxLength={MAXLENGTH}
          value={userData.aboutText}
          onChange={() => {}}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Отмена
          </Button>
          <Button variant="contained" color="primary" onClick={handleAction}>
            Сохранить
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
