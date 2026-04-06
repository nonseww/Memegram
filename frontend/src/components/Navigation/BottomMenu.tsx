import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import { useState } from "react";
import { NAV_ELEMENTS } from "@/data/navigation";
import { Icon } from "@/ui";
import classes from "./BottomMenu.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export const BottomMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentIndex = NAV_ELEMENTS.findIndex(
    (item) => item.href === location.pathname,
  );
  const [value, setValue] = useState<number>(
    currentIndex !== -1 ? currentIndex : 0,
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const href = NAV_ELEMENTS[newValue].href;
    if (href) {
      navigate(href);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "95vw", md: 600, lg: 800 },
        position: "fixed",
        zIndex: 5,
        bottom: 10,
        borderRadius: 30,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        className={classes.bottomMenu}
        sx={{
          width: "100%",
          borderRadius: 30,
          background: "rgba(138, 43, 226, 0.6)",
        }}
      >
        {NAV_ELEMENTS.map(({ id, label, src, alt }) => (
          <BottomNavigationAction
            sx={{
              color: "white",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
              "&:focus": {
                outline: "none",
              },
              "&.Mui-focusVisible": {
                outline: "none",
              },
              "& .MuiTouchRipple-root": {
                display: "none",
              },
            }}
            key={id}
            label={label}
            icon={
              <Icon
                id={id}
                src={src}
                alt={alt}
                style={{ color: "white" }}
                color="white"
              />
            }
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};
