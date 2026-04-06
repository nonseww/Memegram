import { createTheme } from "@mui/material/styles";
import v from "@/styles/_variables.module.scss";

export const theme = createTheme({
  typography: {
    fontFamily: '"JetBrains_Regular", sans-serif',
  },
  palette: {
    primary: {
      main: v.mainYellow,
      dark: v.activeButtonColor,
      contrastText: v.textColor,
    },
    secondary: {
      main: v.mainPurple,
      light: v.secondaryPurple,
    },
    background: {
      default: v.bg,
    },
    text: {
      primary: v.textColor,
      secondary: v.textPlaceholder,
    },
  },
});

// glass header purple blur 4px
