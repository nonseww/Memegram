import LogoImage from "./assets/logo_image.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Memegram from "./assets/Memegram.svg";
import v from "@/styles/_variables.module.scss";
import Search from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "white",
        borderBottom: `1px solid ${v.mainBorder}`,
        borderRadius: 30,
        top: "10px",
        width: "95vw",
        left: "50%",
        transform: "translateX(-50%)",
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
            sx={{ height: { xs: 35, lg: 45 }, mr: 3 }}
          />
          <Box
            component="img"
            src={Memegram}
            alt="Memegram"
            sx={{ height: { xs: 18, md: 23 } }}
          />
        </Box>

        <IconButton
          onClick={onMenuClick}
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            alignItems: "center",
          }}
          size="large"
        >
          <Search fontSize="inherit" />
        </IconButton>

        <Autocomplete
          freeSolo
          options={["a", "b", "c"]}
          sx={{
            display: { xs: "none", md: "block" },
            width: "40%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
            },
            mr: 3,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Найти мем..."
              size="small"
              slotProps={{
                input: {
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
      </Toolbar>
    </AppBar>
  );
};
