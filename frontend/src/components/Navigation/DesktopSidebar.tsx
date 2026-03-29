import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { NavigationList } from "./NavigationList";
import v from "/src/styles/_variables.module.scss";

const DRAWER_WIDTH = 280;

export const DesktopSidebar = () => (
  <Box
    component="nav"
    sx={{
      width: { lg: DRAWER_WIDTH },
      flexShrink: { lg: 0 },
      display: { xs: "none", lg: "flex" },
    }}
  >
    <Toolbar />
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: `1px solid ${v.mainBorder}`,
          p: 3,
          display: "flex",
          flexDirection: "column",
        },
      }}
      open
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          mt: "30%",
          alignItems: "center",
          p: 3,
        }}
      >
        <NavigationList />
      </Box>
    </Drawer>
  </Box>
);
