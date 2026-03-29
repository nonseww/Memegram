import LogoImage from "./assets/logo_image.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Memegram from "./assets/Memegram.svg";
import MenuIcon from "@mui/icons-material/Menu";
import v from "/src/styles/_variables.module.scss";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: v.mainYellow,
        borderBottom: `1px solid ${v.mainBorder}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="a"
          href="/"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box
            component="img"
            src={LogoImage}
            alt="logo"
            sx={{ height: { xs: 40, lg: 50 }, mr: 3 }}
          />
          <Box
            component="img"
            src={Memegram}
            alt="Memegram"
            sx={{ height: { xs: 20, md: 25, lg: 28 } }}
          />
        </Box>

        <IconButton
          onClick={onMenuClick}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size="large"
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
