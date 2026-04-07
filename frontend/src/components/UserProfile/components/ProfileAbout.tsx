import { MultilineTextField } from "@/ui/MultilineTextField";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ProfileAboutProps {
  about: string;
  isEditing: boolean;
  onAboutChange: (value: string) => void;
}

const MAXLENGTH = 300;

export const ProfileAbout = ({
  about,
  isEditing,
  onAboutChange,
}: ProfileAboutProps) => {
  return (
    <Stack direction="column" spacing={1} sx={{ width: "90%", mx: "auto" }}>
      {!isEditing && (
        <Typography variant="h6" color="primary">
          О себе:
        </Typography>
      )}
      {isEditing ? (
        <MultilineTextField
          maxLength={MAXLENGTH}
          value={about}
          onChange={onAboutChange}
        />
      ) : (
        <Typography>{about}</Typography>
      )}
      {!isEditing && <Divider sx={{ borderColor: "primary.main" }} />}
    </Stack>
  );
};
