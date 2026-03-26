import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Box, Toolbar } from "@mui/material";
import { MobileDrawer, DesktopSidebar } from "../../components/Navigation";
import v from "/src/styles/_variables.module.scss";

const DRAWER_WIDTH = 280;

export const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100pvh", bgcolor: "inherit" }}>
      <Header onMenuClick={handleDrawerToggle} />
      <MobileDrawer isOpen={mobileOpen} onClose={handleDrawerToggle} />
      <DesktopSidebar />

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
