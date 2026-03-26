import LogoImage from "./assets/logo_image.svg";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
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
        boxShadow: "none",
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
          <img
            src={LogoImage}
            alt="logo"
            style={{ height: 40, marginRight: 20 }}
          />
          <img src={Memegram} alt="Memegram" style={{ height: 30 }} />
        </Box>

        <IconButton
          onClick={onMenuClick}
          sx={{
            mr: 2,
            display: {
              xs: "block",
              lg: "none",
            },
          }}
          size="large"
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
