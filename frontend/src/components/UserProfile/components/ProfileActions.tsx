import Button from "@mui/material/Button";
import { Box } from "@mui/system";

interface ProfileActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isLoading?: boolean;
}

export const ProfileActions = ({
  onCancel,
  onSave,
  //isLoading,
}: ProfileActionsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 4,
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={onCancel}
        sx={{ bgcolor: "#555555ff" }}
      >
        Отмена
      </Button>
      <Button variant="contained" color="primary" onClick={onSave}>
        Сохранить
      </Button>
    </Box>
  );
};
