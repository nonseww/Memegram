import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { NavigationList } from "./NavigationList";
import v from "@/styles/_variables.module.scss";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => (
  <Drawer
    anchor="left"
    variant="temporary"
    open={isOpen}
    onClose={onClose}
    slotProps={{
      paper: {
        sx: {
          width: "100%",
          height: "100%",
          bgcolor: v.mainYellow,
          border: "none",
        },
      },
    }}
  >
    <Box
      role="presentation"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <NavigationList onItemClick={onClose} />
    </Box>
  </Drawer>
);
