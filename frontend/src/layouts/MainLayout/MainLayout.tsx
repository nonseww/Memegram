import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { BottomMenu } from "@/components/Navigation";

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
