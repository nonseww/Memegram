import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { BottomMenu } from "@/components/Navigation";

const DRAWER_WIDTH = 280;

export const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100pvh", bgcolor: "inherit" }}>
      <Header onMenuClick={() => {}} />
      <BottomMenu />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
